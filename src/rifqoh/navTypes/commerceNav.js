import "../../App.css";

import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { withRouter } from "react-router";

class CommerceNav extends Component {

  createShopUrl = () => {
    const slug = localStorage.getItem("shopSlug");
    const pathname = window.location.host;
    let shopUrl;
    if (pathname.includes('www')){
      shopUrl = pathname.replace('www',slug);
    } else {
      shopUrl = `${slug}.${pathname}`
    }
    return 'http://'+shopUrl;
  }
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
            {logo ? <img src={logo} className="logo" alt={shopName}/> : shopName}
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
                  Tags
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/products"
                  activeClassName="active"
                  className="nav-link"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/commerce/edit"
                  activeClassName="active"
                  className="nav-link"
                >
                  Edit
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
                    >
                      GO TO STORE
                    </a>
                    <Link
                      to='/'
                      onClick={this.logout}
                      className="dropdown-item" 
                    >
                      Log out
                    </Link>
                    <Link
                      to='/commerce/change_password'
                      className="dropdown-item" 
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(CommerceNav);
