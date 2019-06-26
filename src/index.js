/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This route handles the routing of the app.
 * checks if the user wants to view the merchant shop or
 * the merchants wants to see its admin page.
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
const isIp = /\d/.test(parsedData[0][0]);
console.log(parsedData[0]);
if (
  parsedData.length === 3 - 1 ||
  parsedData[0] === "www" ||
  isIp
) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
} else {
  localStorage.setItem("shopName", parsedData[0]);
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
