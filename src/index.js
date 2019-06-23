/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import App from "./App";
import AppS from "./AppS";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import store from "./rifqoh/storeRedux/store";

const parsedData = window.location.host.split(".");
if (parsedData.length === 3 - 1 || parsedData[0] === "www" || /\d/.test(window.location.host)) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
} else {
  localStorage.setItem('shopName', parsedData[0]);
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppS />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}
registerServiceWorker();
