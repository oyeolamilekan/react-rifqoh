import React, { useEffect, useState } from "react";

import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default function Products() {
  /**
   * I hate React hooks, fuck you facebook.
   */
  const [products, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [empty, setempty] = useState(false);
  const [error, seterror] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${Token()}`
  };

  const getProducts = () => {
    axios
      .get(`${url}/api/get_products_clicked/`, { headers: headers })
      .then(res => {
        let data = JSON.parse(res.data);
        setproduct(data);
        setloading(false);
        if (data.length < 0) {
          setempty(true);
        } else {
          setempty(false);
        }
      })
      .catch(() => {
        seterror(true);
      });
  };

  useEffect(() => {
    getProducts();
  }, [empty, error, loading]);

  return (
    <div className="product-clicked">
      <h5 className="mb-1 mt-3">
        <b>Recently Clicked</b>
      </h5>
      <div className="p-3 bg-white rounded canvas-container">
        {loading ? (
          <p>Loading please wait.</p>
        ) : error ? (
          <p className="text-center">Something bad happened</p>
        ) : empty ? (
          <p>You have no data yet</p>
        ) : (
          products.map(items => <p>{items.name}</p>)
        )}
      </div>
    </div>
  );
}
