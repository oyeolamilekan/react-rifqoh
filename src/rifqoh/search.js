/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "./bodyPage";

import React, { Component } from "react";

import Progress from "react-progress-2";
import url from "./url";
import { withRouter } from "react-router";

class Search extends Component {
  constructor(props) {
    super(props);
    // BodyPage.caller(updateOnQuery('terr'))
    this.state = {
      results: [],
      term: "",
      redirect: false
    };

    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }

  changeTerm(event) {
    this.setState({ term: event.target.value });
  }

  componentWillUpdate() {
    Progress.hide();
  }
  componentWillUnmount() {
    this.setState({ term: "", results: [] });
  }
  submit(event) {
    const {shop_slug} = this.props;
    Progress.show();
    event.preventDefault();
    let urll = `${url}/api/r_search/${shop_slug}/?q=` + this.state.term;
    fetch(urll, {})
      .then(res => res.json())
      .then(respone => {
        console.log(respone.results);
        let data = {
          results: respone.results,
          redirect: true
        };
        this.setState(data);
        this.props.getResults(this.state.results);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input
            onChange={this.changeTerm}
            className="form-control "
            placeholder="Search ..."
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Search);
