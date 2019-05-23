import "react-progress-2/main.css";

import { Link } from "react-router-dom";
import Progress from "react-progress-2";
import React from "react";
import { withRouter } from "react-router";

function MiniNavigation({ tags, shop }) {
  const clicker = () => {
    Progress.show();
  };
  const matchExact = str => {
    const urlArray = window.location.pathname.split("/");
    return urlArray.includes(str);
  };
  const getNavLinkClass = (path, name) => {
    return matchExact(path) > 0 ? "active" : "";
  };
  return (
    <div className="bg-white list-container p-2">
      <div className="nav-scroller bg-white shadow-sm p-2 rounded">
        <div className="nav nav-underline">
          {tags.map((item, index) => (
            <Link
              className={`nav-link  ${getNavLinkClass(item.slug, item.name)}`}
              to={`/${shop}/store/${item.slug}/`}
              onClick={clicker}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default withRouter(MiniNavigation);
