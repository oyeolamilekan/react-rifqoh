import {
  GET_PRODUCTS,
  GET_SHOP_INFO,
  MORE_PRODUCTS,
  SEARCH_PRODUCTS
} from "../actions/types.js";

const initialState = {
  products: [],
  shop_info: {},
  nextUrl: "",
  nextLoading: false,
  loading: true,
  navLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        nextUrl: action.nextUrl,
        loading: false
      };
    case GET_SHOP_INFO:
      return {
        ...state,
        shop_info: action.payload,
        navLoading: false
      };
    case MORE_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        nextUrl: action.nextUrl,
        nextLoading: action.nextUrl === "" ? false : true
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state;
  }
}
