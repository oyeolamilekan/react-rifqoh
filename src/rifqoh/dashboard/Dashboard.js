import Analytics from "./Analytics";
import Nav from "../navTypes/commerceNav";
import Products from "./Products";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <Nav />
      <div className="col-md-8 offset-md-2 mt-2">
        <Analytics />
        <Products />
      </div>
    </div>
  );
}
