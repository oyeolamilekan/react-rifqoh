/*
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
import MiniNavigationT from "./miniNavT";
import Nav from "../navTypes/nav";
import Progress from "react-progress-2";
import url from "../url";

class Trending_l extends Component {
  state = {
    productList: [],
    isNext: null,
    isLoading: true,
    isNextLoading: false
  };

  // Checks if the user has reached the end
  // of the screen
  isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  // Removes the progressbar if the
  // the user tries to click the link again
  componentWillUpdate() {
    Progress.hide();
  }

  // Removes the progress bar
  // When the page is first loaded
  componentDidMount() {
    Progress.hide();
    fetch(`${url}/api/laptops_t/`, {})
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

  // Renders the given page to the user
  render() {
    const { isNextLoading, isLoading, productList } = this.state;
    return (
      <div>
        <Nav />
        {isLoading ? (
          <div className="container pre-loader mt-100 h-100 text-center">
            <Loading />
          </div>
        ) : (
          <div>
            <CurrentPage current="Laptops" dClass="grd-color-5" />
            <MiniNavigationT />
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

export default Trending_l;
