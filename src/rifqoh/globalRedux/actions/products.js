import {
  GET_PRODUCTS,
  GET_SHOP_INFO,
  GET_TRENDING_PRODUCTS,
  MORE_PRODUCTS,
  MORE_TRENDING_PRODUCTS,
  SEARCH_PRODUCTS
} from "./types";

import axios from "axios";
import url from "../../config/url";

export const getShopInfo = ({ slug }) => dispatch => {
  axios
    .get(`${url}/api/shop_info/${slug}/`)
    .then(res => {
      const { shop_name, tags, logo, slug } = res.data.shop_info;
      const shop_info = { shop_name, tags, logo, slug };
      dispatch({
        type: GET_SHOP_INFO,
        payload: shop_info
      });
    })
    .catch(() => this.props.history.push("/404"));
};

export const getProducts = ({ slug, cat }) => dispatch => {
  cat = cat === undefined ? "index" : cat;
  axios
    .get(`${url}/api/shop_product/${slug}/${cat}/`)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.results,
        nextUrl: res.data.next ? res.data.next.replace(url, "") : ""
      });
    })
    .catch(err => console.log(err));
};

export const getMoreProducts = nextUrl => dispatch => {
  if (nextUrl !== "") {
    let next = `${url}${nextUrl}`;
    axios
      .get(next)
      .then(res => {
        dispatch({
          type: MORE_PRODUCTS,
          payload: res.data.results,
          nextUrl: res.data.next !== null ? res.data.next.replace(url, "") : ""
        });
      })
      .catch(e => console.log(`${e}`));
  }
};

export const searchProducts = (shop_name, query_param) => dispatch => {
  axios
    .get(`${url}/api/r_search/${shop_name}/?q=${query_param}`)
    .then(res => {
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: res.data.results
      });
    })
    .catch(() => this.props.history.push("/404"));
};
