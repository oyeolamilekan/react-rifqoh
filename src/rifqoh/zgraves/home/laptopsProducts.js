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

class laptopsProducts extends Component {
  state = {
    productList: [],
    isNext: null,
    isLoading: true,
    isNextLoading: false
  };

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUpdate() {
    Progress.hide();
  }
  componentDidMount() {
    Progress.hide();
    fetch(`${url}/api/laptops/`, {})
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

  trackScrolling = () => {
    const wrappedElement = document.getElementById("root");
    if (this.isBottom(wrappedElement)) {
      this.setState({
        isNextLoading: true
      });
      // document.removeEventListener('scroll', this.trackScrolling);
      this.loadMore();
    }
  };

  loadMore = () => {
    let next = `${url}${this.state.isNext}`;
    if (next !== "") {
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
    } else {
      this.setState({
        isNextLoading: false
      });
    }
  };

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  render() {
    const { productList, isNextLoading, isLoading } = this.state;
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

export default laptopsProducts;
