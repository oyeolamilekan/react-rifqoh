import React from "react";

const toggleNav = (props) => {
  return (
    <div>
      <button
        type="button"
        id="sidebarCollapse"
        className="btn btn-info navbar-btn"
        onClick={props.btnAction}
      >
        <i className="uil uil-list-ul" />
        <span>Toggle Sidebar</span>
      </button>
    </div>
  );
};

export default toggleNav;
