/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "react-progress-2/main.css";

import React, { Component } from "react";

import BodyPage from "../bodyPage";
import CurrentPage from "../currentPage";
import Loading from "../loading";
import MiniLoading from "../miniLoading";
import MiniNavigation from "./mininav";
import Nav from "../navTypes/nav";
import Progress from "react-progress-2";
import url from "../url";

class phoneProducts extends Component {
  state = {
    productList: [],
    isNext: null,
    isLoading: true,
    isNextLoading: false
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUpdate() {
    Progress.hide();
  }

  componentDidMount() {
    Progress.hide();
    fetch(`${url}/api/phone/`, {})
      .then(res => res.json())
      .then(response => {
        this.setState({
          productList: response.results,
          isNext: response.next ? response.next.replace(url, "") : "",
          isLoading: false
        });
      });
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("root");
    if (this.isBottom(wrappedElement)) {
      this.setState({
        isNextLoading: true
      });
      this.loadMore();
    }
  };

  loadMore = () => {
    let next = `${url}${this.state.isNext}`;
    if (next !== null) {
      fetch(next, {})
        .then(res => res.json())
        .then(response => {
          let resultss = this.state.productList;
          let newpost = resultss.concat(response.results);
          let next =
            response.next === null ? "" : response.next.replace(url, "");
          this.setState({
            productList: newpost,
            isNext: next,
            isNextLoading: false
          });
        });
    }
  };

  render() {
    const { isNextLoading, productList, isLoading } = this.state;
    return (
      <div>
        <Nav />
        {isLoading ? (
          <div className="container pre-loader mt-100 h-100 text-center">
            <Loading />
          </div>
        ) : (
          <div>
            <CurrentPage current="Phone" dClass="grd-color-4" />
            <MiniNavigation />
            <BodyPage results={productList} />
            {isNextLoading ? (
              <div className="text-center">
                <MiniLoading />
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}

export default phoneProducts;
