import "react-progress-2/main.css";

import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Progress from "react-progress-2";

class MiniNavigationS extends Component {
  render() {
    const { shop } = this.props;
    return (
      <div className="nav-scroller p-2">
        <div className="bg-white nav">
          <span className="mr-2">
            <NavLink
              to={`/${shop}/all`}
              className="nav-link d-inline text-dark"
              onClick={this.clicker}
            >
            <i className='uil uil-window'/>
              Index
            </NavLink>
          </span>
          <span className="mr-2">
            <NavLink
              to={`/${shop}/phone`}
              className="nav-link d-inline text-dark"
              onClick={this.clicker}
            >
              <i className="uil uil-mobile-android" />
              Phone
            </NavLink>
          </span>
          <span className="mr-2">
            <NavLink
              to={`/${shop}/laptops`}
              className="nav-link d-inline text-dark"
              onClick={this.clicker}
            >
              <i className="uil uil-laptop" />
              Laptops
            </NavLink>
          </span>
          <span className="mr-2">
            <NavLink
              to={`/${shop}/gaming`}
              className="nav-link d-inline text-dark"
              onClick={this.clicker}
            >
              <i className="uil uil-game-structure" />
              Gaming
            </NavLink>
          </span>
        </div>
      </div>
    );
  }
  clicker() {
    Progress.show();
  }
}
export default MiniNavigationS;
