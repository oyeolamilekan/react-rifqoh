import "../../App.css";

import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { withRouter } from "react-router";

class CommerceNav extends Component {

  // Logout functionality for the nav
  logout = event => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.push("/logout");
  };

  render() {
    const username = localStorage.getItem("username");
    const logo = localStorage.getItem("logo");
    const { name: shopName } = this.props;
    const slugName = shopName.toLowerCase();
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
                  to="/admin/tags"
                  activeClassName="active"
                  className="nav-link"
                >
                  Tags
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/admin/products"
                  activeClassName="active"
                  className="nav-link"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/edit"
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
                    <Link
                      to={`/${slugName}/store/index/`}
                      className="dropdown-item"
                      target="_blank"
                    >
                      GO TO STORE
                    </Link>
                    <Link
                      to='/logout'
                      onClick={this.logout}
                      className="dropdown-item" 
                    >
                      Log out
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
