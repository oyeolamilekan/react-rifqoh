/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "./App.css";
import "react-progress-2/main.css";

import MainS from "./rifqoh/routers/storeRouter";
import Progress from "react-progress-2";
import React from "react";

function App() {
  return (
    <div>
        <Progress.Component
          style={{ background: "#dc3545" }}
          thumbStyle={{ background: "#dc3545" }}
        />
        <MainS />
    </div>
  );
}

export default App;
