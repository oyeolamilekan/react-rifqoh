/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "./bodyPage";

import React, { Component } from "react";

import Progress from "react-progress-2";
import { connect } from "react-redux";
import { searchProducts } from "../globalRedux/actions/products";
import { withRouter } from "react-router";

class Search extends Component {
  state = {
    term: ""
  };

  changeTerm = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = event => {
    event.preventDefault();
    const { term } = this.state;
    const { shop_slug } = this.props;
    Progress.show();
    this.props.searchProducts(shop_slug, term);
  };

  render() {
    const { term } = this.state;
    return (
      <div>
        <form onSubmit={this.submit}>
          <input
            onChange={this.changeTerm}
            className="form-control"
            value={term}
            name="term"
            placeholder="Search ..."
          />
        </form>
      </div>
    );
  }
}
export default connect(
  null,
  { searchProducts }
)(withRouter(Search));
