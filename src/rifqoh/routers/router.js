/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import { PrivateRoute, UnAuthRoute } from "../utils/utils";
import { Route, Switch } from "react-router-dom";

import ChangePassword from "../accounts/ChangePassword";
import EditInfo from "../commerce/EditInfo";
import Home from "../frontPage/Home";
import Lesson from "../commerce/Lessons";
import Login from "../accounts/Login";
import Logout from "../accounts/Logout";
import NotFound from "../errorPages/404";
import PasswordResetChange from "../accounts/PasswordResetChange";
import PasswordResetForm from "../accounts/PasswordResetForm";
import React from "react";
import SignUp from "../accounts/Signup";
import cProducts from "../commerce/cProducts";
import createShop from "../commerce/createStore";
import productAnalytics from "../analytics/products";
import tagsProduct from "../commerce/tagsProduct";

const Main = () => (
  <div className="con">
    <Switch>
      <Route exact path="/" component={Home} />
      <UnAuthRoute path="/commerce/login" component={Login} />
      <Route path="/commerce/logout" component={Logout} />
      <UnAuthRoute path="/commerce/signup" component={SignUp} />
      <Route path="/commerce/reset" component={PasswordResetForm} />
      <Route
        path="/commerce/reset-change/:token"
        component={PasswordResetChange}
      />
      <PrivateRoute
        path="/commerce/change_password"
        component={ChangePassword}
      />
      <PrivateRoute path="/commerce/products" component={cProducts} />
      <PrivateRoute path="/commerce/tags" component={tagsProduct} />
      <PrivateRoute path="/commerce/edit" component={EditInfo} />
      <PrivateRoute path="/commerce/create/shop" component={createShop} />
      <PrivateRoute path="/commerce/lessons/:slug" component={Lesson} />
      <PrivateRoute
        path="/commerce/product-analytics/:slug"
        component={productAnalytics}
      />
      <Route path="" component={NotFound} />
    </Switch>
  </div>
);
export default Main;
