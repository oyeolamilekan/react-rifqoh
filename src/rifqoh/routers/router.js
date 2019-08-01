/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import { PrivateRoute, UnAuthRoute } from "../utils/utils";
import { Route, Switch } from "react-router-dom";

import ChangePassword from "../accounts/ChangePassword";
import Dashboard from "../dashboard/Dashboard";
import EditInfo from "../commerce/EditInfo";
import Home from "../frontPage/Home";
import Index from "../giveaway/index";
import Lesson from "../commerce/Lessons";
import Login from "../accounts/Login";
import Logout from "../accounts/Logout";
import NotFound from "../errorPages/404";
import PasswordResetChange from "../accounts/PasswordResetChange";
import PasswordResetForm from "../accounts/PasswordResetForm";
import React from "react";
import SignUp from "../accounts/Signup";
import aboutPage from "../mypage";
import cProducts from "../commerce/cProducts";
import createShop from "../commerce/createStore";
import productAnalytics from "../analytics/products";
import shopAnalytics from "../analytics/shop";
import tagsProduct from "../commerce/tagsProduct";

const Main = () => (
  <div className="con">
    <Switch>
      <UnAuthRoute path="/commerce/login" component={Login} />
      <UnAuthRoute path="/commerce/signup" component={SignUp} />
      <Route exact path="/" component={Home} />
      <Route path="/commerce/logout" component={Logout} />
      <Route path="/commerce/reset" component={PasswordResetForm} />
      <Route path="/commerce/oye-olalekan-johnson" component={aboutPage} />
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
      <PrivateRoute
        path="/commerce/shop-analytics/:slug"
        component={shopAnalytics}
      />
      <PrivateRoute path="/commerce/give-away" component={Index}/>
      <PrivateRoute path="/commerce/home" component={Dashboard}/>
      <Route path="" component={NotFound} />
    </Switch>
  </div>
);
export default Main;
