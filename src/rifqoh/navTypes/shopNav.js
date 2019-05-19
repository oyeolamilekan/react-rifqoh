import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Progress from "react-progress-2";
import Search from "../search";
import { withRouter } from "react-router";

class ShopNav extends Component {
  getNavLinkClass = path => {
    return this.props.location.pathname.indexOf(path) > 0 ? "active" : "";
  };
  render() {
    const { shop, logo, slug } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <NavLink
            to={`/${slug}/store/index`}
            className="navbar-brand"
            onClick={clicker}
          >
            {logo ? (
              <img src={logo} alt="logo" className="logo" />
            ) : (
              <div style={{ marginLeft: -10 }}> {shop.substring(0, 1)}</div>
            )}
          </NavLink>
          <div className="specialBar">
            <Search />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li
                className={`nav-item`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink
                  exact
                  to={`/${slug}/store/index`}
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="uil uil-home-alt" />
                  Home
                </NavLink>
              </li>
              <li
                className={`nav-item`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink
                  exact
                  to="/trending"
                  activeClassName="active"
                  className="nav-link"
                >
                  <i className="uil uil-arrow-growth" />
                  Trending
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* {tags ? (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <div className="ml-4 d-none d-lg-block d-xl-block">
                <Search />
              </div>
              <ul className="navbar-nav ml-auto">
                {tags.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      to={`/${shop}/store/${item}/`}
                      className={`nav-link ${this.getNavLinkClass(`${item}`)}`}
                      onClick={() => clicker()}
                    >
                      {jsUcfirst(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )} */}
        </nav>
      </div>
    );
  }
}

function clicker() {
  Progress.show();
}

export default withRouter(ShopNav);
