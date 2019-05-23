import React, { Component } from "react";

class CurrentPage extends Component {
  render() {
    const { current,dClass } = this.props;
    return (
      <div className={`${dClass} p-2`}>
        <h3 className="text-center text-white mt-2">{current}</h3>
      </div>
    );
  }
}

export default CurrentPage;
