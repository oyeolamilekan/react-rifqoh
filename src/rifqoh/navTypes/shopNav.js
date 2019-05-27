import React, { Component } from "react";

import MiniNavigation from "../utils/mininav";
import { NavLink } from "react-router-dom";
import Progress from "react-progress-2";
import Search from "../zgraves/search";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class ShopNav extends Component {
  getNavLinkClass = path => {
    return this.props.location.pathname.indexOf(path) > 0 ? "active" : "";
  };
  getResults = results => {
    this.props.getResults(results);
  };
  render() {
    const { shop_name, logo, tags, slug } = this.props.shop_info;
    const { navLoading } = this.props;
    return (
      <div>
        {navLoading ? (
          ""
        ) : (
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
                  <div style={{ marginLeft: -10 }}>
                    {" "}
                    <b>{shop_name.substring(0, 1)}</b>
                  </div>
                )}
              </NavLink>
              <div className="specialBar mr-1">
                <Search shop_slug={slug} getResults={this.getResults} />
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
                      activeClassName={`active`}
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
                      to={`/${slug}/store/trending`}
                      activeClassName={`active`}
                      className="nav-link"
                    >
                      <i className="uil uil-home-alt" />
                      Trending
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item`}
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <div className="mr-auto d-none d-lg-block d-xl-block">
                      <Search shop_slug={slug} getResults={this.getResults} />
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <MiniNavigation tags={tags} slug={slug} />
          </div>
        )}
      </div>
    );
  }
}

const clicker = () => {
  Progress.show();
};
const mapStateToProps = state => ({
  shop_info: state.products.shop_info,
  navLoading: state.products.navLoading
});
export default connect(mapStateToProps)(withRouter(ShopNav));
