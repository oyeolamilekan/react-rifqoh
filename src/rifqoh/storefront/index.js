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
    shop_category: [],
    shop_slug: "",
    products: [],
    isLoading: true,
    isNextLoading: false,
    isNext: null
  };

  componentDidMount() {
    const { slug } = this.props.match.params;
    axios
      .get(`${url}/api/shop_info/${slug}/`)
      .then(res => {
        const { shop_name, tags, logo, slug } = res.data.shop_info;
        this.setState({
          shop: shop_name,
          logo: logo,
          shop_slug: slug,
          shop_category: tags,
          isLoading: false
        });
      })
      .catch(() => this.props.history.push("/404"));
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

  getResults = results => {
    this.setState({
      products:results
    })
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const {
      shop,
      shop_category,
      products,
      isNextLoading,
      isLoading,
      logo,
      shop_slug
    } = this.state;
    const { slug } = this.props.match.params;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{shop} store</title>
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
              tags={shop_category}
              slug={slug}
              shop_slug={shop_slug}
              getProducts={this.getProducts}
              getResults={this.getResults}
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
