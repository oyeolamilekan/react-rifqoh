/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import { Route, Switch } from "react-router-dom";

import ChangePassword from "../accounts/ChangePassword";
import EditInfo from "../commerce/EditInfo";
import GamingIndex from "../shop/gaming";
import Home from "../admin/Home";
import Index from "../storefront";
import LaptopIndex from "../shop/laptops";
import Login from "../accounts/Login";
import Logout from "../accounts/Logout";
import NotFound from "../404";
import PhoneIndex from "../shop/phone";
import { PrivateRoute } from "../utils";
import React from "react";
import Results from "../results";
import Shop from "../shop";
import ShopIndex from "../shop/p_index";
import SignUp from "../accounts/Signup";
import Trending from "../trending/trending";
import Trending_g from "../trending/trending_g";
import Trending_l from "../trending/trending_l";
import Trending_p from "../trending/trending_p";
import cProducts from "../commerce/cProducts";
import createShop from "../commerce/createStore";
import gamingProducts from "../home/gamingProducts";
import laptopsProducts from "../home/laptopsProducts";
import phoneProducts from "../home/phoneProducts";
import tagsProduct from "../commerce/tagsProduct";

const Main = () => (
  <div className="con">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/phone" component={phoneProducts} />
      <Route path="/laptops" component={laptopsProducts} />
      <Route path="/gaming" component={gamingProducts} />
      <Route path="/trending" component={Trending} />
      <Route path="/trending_p" component={Trending_p} />
      <Route path="/trending_l" component={Trending_l} />
      <Route path="/trending_g" component={Trending_g} />
      <Route path="/results" component={Results} />
      <Route path="/shop" component={Shop} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={SignUp} />
      <Route path="/change_password" component={ChangePassword} />
      <Route path="/:slug/all" component={ShopIndex} />
      <Route path="/:slug/laptops" component={LaptopIndex} />
      <Route path="/:slug/gaming" component={GamingIndex} />
      <Route path="/:slug/phone" component={PhoneIndex} />
      <PrivateRoute path="/admin/products" component={cProducts} />
      <PrivateRoute path="/admin/tags" component={tagsProduct} />
      <PrivateRoute path="/edit" component={EditInfo} />
      <PrivateRoute path="/create/shop" component={createShop} />
      <Route path="/:slug/store/index" component={Index} />
      <Route path="/:slug/store/trending" component={NotFound} />
      <Route path="/:slug/store/:cat" component={Index} />
      <Route path="" component={NotFound} />
    </Switch>
  </div>
);
export default Main;
