import "../../App.css";

import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";

import Feeback from "../feedback/feedback";
import { withRouter } from "react-router";

class CommerceNav extends Component {
  createShopUrl = () => {
    const slug = localStorage.getItem("shopSlug");
    const pathname = window.location.host;
    let shopUrl;
    if (pathname.includes("www")) {
      shopUrl = pathname.replace("www", slug);
    } else {
      shopUrl = `${slug}.${pathname}`;
    }
    return "http://" + shopUrl;
  };
  // Logout functionality for the nav
  logout = event => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const username = localStorage.getItem("username");
    const logo = localStorage.getItem("logo");
    const shopName = localStorage.getItem("shopName");
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className="nav-link text-dark"
          >
            {logo ? (
              <img src={logo} className="logo" alt={shopName} />
            ) : (
              shopName
            )}
          </NavLink>

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
            <ul className="navbar-nav mr-auto ml-2">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/tags"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="fas fa-tags" /> Tags
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/products"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="fas fa-shopping-bag" /> Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/edit"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="far fa-edit" /> Edit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/lessons/index"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="fas fa-video" /> Tutorials
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mr-5">
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Hi, {username}.
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a
                      href={`${this.createShopUrl()}`}
                      className="dropdown-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-store-alt" /> GO TO STORE
                    </a>
                    <span
                      className="dropdown-item pointer"
                      data-toggle="modal"
                      data-target="#feedback"
                    >
                      <i className="fas fa-comment-alt" /> SEND FEEDBACK
                    </span>
                    <Link
                      to="/"
                      onClick={this.logout}
                      className="dropdown-item"
                    >
                      <i className="fas fa-sign-out-alt" /> Log out
                    </Link>
                    <Link
                      to="/commerce/change_password"
                      className="dropdown-item"
                    >
                      <i className="fas fa-lock" /> Change Password
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="modal" id="feedback">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Send feedback</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <Feeback />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CommerceNav);
