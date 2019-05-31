import {
  GET_PRODUCTS,
  GET_SHOP_INFO,
  GET_TRENDING_PRODUCTS,
  MORE_PRODUCTS,
  MORE_TRENDING_PRODUCTS,
  SEARCH_PRODUCTS
} from "../actions/types.js";

const parsedData = window.location.host.split(".");
const shopName = parsedData[0];
const initialState = {
  products: [],
  shop_info: {},
  nextUrl: "",
  shopName:shopName,
  nextLoading: false,
  loading: true,
  navLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SHOP_INFO:
      return {
        ...state,
        shop_info: action.payload,
        navLoading: false
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        nextUrl: action.nextUrl,
        loading: false,
        nextLoading: action.nextUrl === "" ? false : true
      };
    case MORE_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        nextUrl: action.nextUrl,
        nextLoading: action.nextUrl === "" ? false : true
      };
    case GET_TRENDING_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        nextUrl: action.nextUrl,
        loading: false,
        nextLoading: action.nextUrl === "" ? false : true
      };
    case MORE_TRENDING_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        nextUrl: action.nextUrl,
        nextLoading: action.nextUrl === "" ? false : true
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}
