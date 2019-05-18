import React, { Component } from "react";

import { Link } from "react-router-dom";
import Progress from "react-progress-2";
import { jsUcfirst } from "../utils";
import { withRouter } from "react-router";

class ShopNav extends Component {
  getNavLinkClass = path => {
    return this.props.location.pathname.indexOf(path) > 0 ? "active" : "";
  };
  render() {
    const { shop, tags, logo } = this.props;
    const slug = localStorage.getItem('shopSlug');
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <Link
            to={`/${slug}/store/index`}
            className="navbar-brand"
            onClick={clicker}
          >
            {logo ? <img src={logo} alt="logo" className="logo" /> : shop}
          </Link>

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

          {tags ? (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
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
          )}
        </nav>
      </div>
    );
  }
}

function clicker() {
  Progress.show();
}

export default withRouter(ShopNav);
