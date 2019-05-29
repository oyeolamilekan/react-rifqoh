/**
 * Experimental code, trying to splits the
 * component route into different files.
 * in other to make it eaiser
 */

import { Route, Switch } from "react-router-dom";

import Index from "../storefront";
import NotFound from "../errorPages/404";
import React from "react";
import Trending from "../storefront/trending";

const MainS = () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route path="/404" component={NotFound} />
    <Route exact path="/trending" component={Trending}/>
    <Route path="/trending/:slug" component={Trending}/>
    <Route path="/:slug" component={Index} />
  </Switch>
);

export default MainS;