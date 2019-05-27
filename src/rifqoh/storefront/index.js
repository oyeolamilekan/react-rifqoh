import React, { Component } from "react";
import {
  getMoreProducts,
  getProducts,
  getShopInfo
} from "../globalRedux/actions/products";

import MiniLoading from "../zgraves/miniLoading";
import ProductDetails from "./ProductDetail";
import Progress from "react-progress-2";
import ShopNav from "../navTypes/shopNav";
import { connect } from "react-redux";

class Index extends Component {
  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { cat }
      }
    } = this.props;
    if (prevProps.match.params.cat !== cat) {
      this.getProducts();
    } else {
      Progress.hide();
    }
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  getProducts() {
    this.props.getProducts(this.props.match.params);
    this.props.getShopInfo(this.props.match.params);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("root");
    if (this.isBottom(wrappedElement)) {
      this.loadMore();
    }
  };

  loadMore = () => {
    this.props.getMoreProducts(this.props.nextUrl);
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const { products, loading, nextLoading } = this.props;
    return (
      <div className="commerce-container">
        {loading ? (
          <div className="mt-5 text-center">
            <h1>Loading</h1>
          </div>
        ) : (
          <div>
            <ShopNav />
            {products.length > 0 ? (
              <ProductDetails results={products} />
            ) : (
              <div className="text-center mt-4">
                <h1> No products available</h1>
              </div>
            )}
            <div className="text-center">
              {nextLoading ? <MiniLoading /> : ""}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  nextUrl: state.products.nextUrl,
  nextLoading: state.products.nextLoading
});
export default connect(
  mapStateToProps,
  { getProducts, getShopInfo, getMoreProducts }
)(Index);
