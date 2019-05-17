import "react-progress-2/main.css";

import React, { Component } from "react";

// import MiniNavigation from './mininav';
import CurrentPage from "../currentPage";
import Nav from "../navTypes/nav";
import { NavLink } from "react-router-dom";
import Progress from "react-progress-2";

class Shop extends Component {
  state = {
    productList: [],
    isNext: null
  };

  componentWillUpdate() {
    Progress.hide();
  }

  componentDidMount() {
    Progress.hide();
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="wraper">
          <CurrentPage current="Shop" dClass="grd-color-7" />
          <div className="mt-4">
            <div className="col-md-6 offset-md-3">
              <div className="p-5 bg-orange text-center text-white rounded">
                <h1>
                  <NavLink
                    to="/jumia/all"
                    onClick={this.clicker}
                    className="link_s"
                  >
                    {" "}
                    Jumia{" "}
                  </NavLink>
                </h1>
              </div>
              <div className="mt-2 p-5 bg-pink text-center text-white rounded">
                <h1>
                  <NavLink
                    to="/konga/all"
                    onClick={this.clicker}
                    className="link_s"
                  >
                    {" "}
                    Konga{" "}
                  </NavLink>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  clicker() {
    Progress.show();
  }
}

export default Shop;
