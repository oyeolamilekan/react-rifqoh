/**
 * Copyright (c) 2018-present, Maincode, Inc.
 *
 * This source code is free
 */

import React, { useEffect } from "react";

import BodyPage from "./bodyPage";
import CurrentPage from "./currentPage";
import MiniNavigation from "./home/mininav";
import Nav from "./navTypes/nav";
import Progress from "react-progress-2";

function Results(props) {
  const { detail } = props.location.state;
  useEffect(() => {
    Progress.hide();
  });
  return (
    <div>
      <Nav/>
      <div className="parent">
        {detail.length === 0 ? (
          <div className="text-center test-fixed container">
            <div className="mt-100">
              <h1 className="text-danger">
                <i className="fa fa-times mb-2" />
              </h1>
              <h4 className="font-weight-light">
                Sorry we can't process your query right now, kindly check your
                search parameter.
              </h4>
            </div>
          </div>
        ) : (
          <div className="result-list">
            <CurrentPage current="Search" dClass="grd-color-1" />
            <MiniNavigation />
            <BodyPage results={detail} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
