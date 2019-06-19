import { Redirect, Route } from "react-router-dom";

import React from "react";

const Token = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const jsUcfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function delimitNumbers(str) {
  return (str.replace(/[,;/`]/,'').replace(/[a-zA-Z]/, '').replace(/,/g, '') + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (
    Boolean(localStorage.getItem('is_commerce')) && localStorage.getItem("username") !== "undefined"
      ? <Component {...props} />
      : <Redirect to={`/commerce/login?redirect=${props.location.pathname}`}/>
  )} />
)

export const UnAuthRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (
    !Boolean(localStorage.getItem('is_commerce')) && localStorage.getItem("username") === null
      ? <Component {...props} />
      : <Redirect to={`/commerce/products`}/>
  )} />
)
export default Token;