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
    document.addEventListener("scroll", this.trackScrolling);
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    document.addEventListener("scroll", this.trackScrolling);
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
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  getProducts() {
    const { slug } = this.props.match.params;
    let shop_data = {
      slug: this.props.shopName,
      cat: slug !== "" ? slug : "index",
      history: this.props.history
    };
    this.props.getProducts(shop_data);
    this.props.getShopInfo(this.props.shopName, this.props.history);
  }

  trackScrolling = () => {
    console.log('this is scrolling')
    const wrappedElement = document.getElementById("commerce");
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
      <div className="commerce-container" id="commerce">
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
            {nextLoading ? (
              <div className="text-center m-0">
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

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  nextUrl: state.products.nextUrl,
  nextLoading: state.products.nextLoading,
  shopName: state.products.shopName
});
export default connect(
  mapStateToProps,
  { getProducts, getShopInfo, getMoreProducts }
)(Index);
