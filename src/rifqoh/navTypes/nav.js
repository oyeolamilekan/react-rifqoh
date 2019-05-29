/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "react-progress-2/main.css";

import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Progress from "react-progress-2";
import Search from "../search";
import strip from "../strip.png";
import { withRouter } from "react-router";

class Navigation extends Component {
  state = {
    username: localStorage.getItem("username")
  };

  // Get the current url that the
  // User is currently in
  // and put active class to parent class
  getNavLinkClass = path => {
    return this.props.location.pathname === path ? "active" : "";
  };

  // This handles the logout event
  // It deletes the token from the
  // Browser and redirects to the
  // Log out page
  logout = event => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.push("/logout");
  };

  // You know what this does.
  render() {
    const username = localStorage.getItem("username");
    const shopName = localStorage.getItem("shopName");
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className="nav-link"
            onClick={clicker}
          >
            <img src={strip} alt="logo" className="logo" />
          </NavLink>
          <div className="specialBar">
            <Search />
          </div>
          <a
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            href="/#"
          >
            <span className="navbar-toggler-icon" />
          </a>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li
                className={`nav-item ${this.getNavLinkClass(
                  "/phone"
                )} ${this.getNavLinkClass("/laptops")} ${this.getNavLinkClass(
                  "/gaming"
                )}`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-link"
                  onClick={clicker}
                >
                <i className="fas fa-home"></i>
                  Home
                </NavLink>
              </li>
              {username ? (
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    exact
                    to="/user_products"
                    activeClassName="active"
                    className="nav-link"
                    onClick={clicker}
                  >
                    <i className="uil uil-newspaper" />
                    Feeds
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li
                className={`nav-item ${this.getNavLinkClass(
                  "/trending_p"
                )} ${this.getNavLinkClass(
                  "/trending_l"
                )} ${this.getNavLinkClass("/trending_g")}`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink
                  exact
                  to="/trending"
                  activeClassName="active"
                  className="nav-link"
                  onClick={clicker}
                >
                  <i className="uil uil-arrow-growth" />
                  Trending
                </NavLink>
              </li>
              <li
                className={`nav-item ${this.getNavLinkClass(
                  "/konga/all"
                )} ${this.getNavLinkClass(
                  "/konga/phone"
                )} ${this.getNavLinkClass(
                  "/konga/laptops"
                )} ${this.getNavLinkClass("/konga/gaming")}
                ${this.getNavLinkClass("/jumia/all")} ${this.getNavLinkClass(
                  "/jumia/phone"
                )} ${this.getNavLinkClass(
                  "/jumia/laptops"
                )} ${this.getNavLinkClass("/jumia/gaming")}`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink
                  exact
                  to="/shop"
                  activeClassName="active"
                  className="nav-link"
                  onClick={clicker}
                >
                  <i className="uil uil-shop" />
                  Shops
                </NavLink>
              </li>
              <div className="ml-4 d-none d-lg-block d-xl-block">
                <Search />
              </div>
            </ul>
            <ul className="navbar-nav ml-auto">
              <div className="l">
                {username ? (
                  <div className="navbar-nav auth-nav-actions">
                    {shopName ? (
                      <NavLink className="nav-link" to="/#username">
                        <i className="fa fa-user-circle text-success" /> Hi,{" "}
                        {username}
                      </NavLink>
                    ) : (
                      <NavLink className="nav-link" to="/#username">
                        <i className="fa fa-user-circle text-success" /> Hi,{" "}
                        {username}
                      </NavLink>
                    )}
                    <NavLink
                      className="nav-link logout"
                      onClick={this.logout}
                      to="/#"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      Logout
                    </NavLink>
                  </div>
                ) : (
                  <div className="non-auth-nav-actions navbar-nav">
                    <NavLink
                      exact
                      to="/login"
                      activeClassName="active"
                      className="nav-link"
                      onClick={clicker}
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      exact
                      to="/accounts"
                      activeClassName="active"
                      className="nav-link"
                      onClick={clicker}
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      Create account
                    </NavLink>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function clicker() {
  Progress.show();
}
export default withRouter(Navigation);
