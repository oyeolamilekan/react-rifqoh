/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import Nav from "../navTypes/nav";
import React from "react";

const Logout = () => (
  <div>
    <Nav />

    <div className="container-fluid text-center mt-100">
      <h1 className="font-weight-light">
        You are logged out,thanks for spending time with us.
      </h1>
      <p>Stay safe</p>
    </div>
  </div>
);

export default Logout;
