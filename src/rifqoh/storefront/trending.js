import React, { Component } from "react";
import {
  getMoreTrendingProducts,
  getShopInfo,
  getTrendingProducts
} from "../globalRedux/actions/products";

import MiniLoading from "../zgraves/miniLoading";
import ProductDetails from "./ProductDetail";
import Progress from "react-progress-2";
import ShopNav from "../navTypes/shopNav";
import { connect } from "react-redux";

class Trending extends Component {
  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { slug }
      }
    } = this.props;
    if (prevProps.match.params.slug !== slug) {
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
    const { slug } = this.props.match.params;
    console.log(this.props.match.params.slug);
    let shop_data = {
      slug: this.props.shopName,
      cat: slug !== "" ? slug : "index",
      history: this.props.history
    };
    this.props.getTrendingProducts(shop_data);
    this.props.getShopInfo(this.props.shopName, this.props.history);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("root");
    if (this.isBottom(wrappedElement)) {
      this.loadMore();
    }
  };

  loadMore = () => {
    this.props.getMoreTrendingProducts(this.props.nextUrl);
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
  nextLoading: state.products.nextLoading,
  shopName: state.products.shopName
});
export default connect(
  mapStateToProps,
  { getTrendingProducts, getShopInfo, getMoreTrendingProducts }
)(Trending);
