/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import { Route, Switch } from "react-router-dom";

import ChangePassword from "../accounts/ChangePassword";
import EditInfo from "../commerce/EditInfo";
import Home from "../frontPage/Home";
import Lesson from "../commerce/Lessons";
import Login from "../accounts/Login";
import Logout from "../accounts/Logout";
import NotFound from "../errorPages/404";
import { PrivateRoute } from "../utils/utils";
import React from "react";
import SignUp from "../accounts/Signup";
import cProducts from "../commerce/cProducts";
import createShop from "../commerce/createStore";
import tagsProduct from "../commerce/tagsProduct";

const Main = () => (
  <div className="con">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/commerce/login" component={Login} />
      <Route path="/commerce/logout" component={Logout} />
      <Route path="/commerce/signup" component={SignUp} />
      <PrivateRoute
        path="/commerce/change_password"
        component={ChangePassword}
      />
      <PrivateRoute path="/commerce/products" component={cProducts} />
      <PrivateRoute path="/commerce/tags" component={tagsProduct} />
      <PrivateRoute path="/commerce/edit" component={EditInfo} />
      <PrivateRoute path="/commerce/create/shop" component={createShop} />
      <PrivateRoute path="/commerce/lessons/:slug" component={Lesson} />
      <Route path="" component={NotFound} />
    </Switch>
  </div>
);
export default Main;
