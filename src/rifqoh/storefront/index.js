import React, { Component } from "react";

import { Helmet } from "react-helmet";
import MiniLoading from "../miniLoading";
import ProductDetails from "./ProductDetail";
import Progress from "react-progress-2";
import ShopNav from "../navTypes/shopNav";
import axios from "axios";
import url from "../url";

export default class Index extends Component {
  state = {
    shop: "",
    logo: "",
    tagsArray: [],
    products: [],
    isLoading: true,
    isNextLoading: false,
    isNext: null
  };

  componentDidMount() {
    const { slug } = this.props.match.params;
    document.title = "loppg"
    axios.get(`${url}/api/shop_info/${slug}/`).then(res => {
      const { shop_name, tags, logo } = res.data.shop_info;
      this.setState({
        shop: shop_name,
        logo: logo,
        tagsArray: tags,
        isLoading: false
      });
    });
    this.getProducts();

    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
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
  }

  getProducts() {
    const { slug, cat } = this.props.match.params;
    axios.get(`${url}/api/shop_product/${slug}/${cat}/`).then(res => {
      this.setState({
        products: res.data.results,
        isNext: res.data.next ? res.data.next.replace(url, "") : ""
      });
    });
    Progress.hide();
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
    const { isNext } = this.state;
    if (isNext !== "") {
      let next = `${url}${isNext}`;
      axios.get(next).then(res => {
        this.setState({
          products: [...this.state.products, ...res.data.results],
          isNext: res.data.next ? res.data.next.replace(url, "") : ""
        });
      });
    } else {
      this.setState({
        isNextLoading: false
      });
    }
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const {
      shop,
      tagsArray,
      products,
      isNextLoading,
      isLoading,
      logo
    } = this.state;
    const { slug } = this.props.match.params;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{slug} store</title>
        </Helmet>
        {isLoading ? (
          <div className="mt-5 text-center">
            <h1>Loading..</h1>
          </div>
        ) : (
          <div>
            <ShopNav
              shop={shop}
              logo={logo}
              tags={tagsArray}
              getProducts={this.getProducts}
            />
            {products.length > 0 ? (
              <ProductDetails results={products} />
            ) : (
              <div className="text-center mt-4">
                <h1> No products available</h1>
              </div>
            )}
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
