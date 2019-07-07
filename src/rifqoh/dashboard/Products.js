import React, { useEffect, useState } from "react";

import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default function Products() {
  const [products, setproduct] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${Token()}`
  };
  useEffect(() => {
    axios
      .get(`${url}/api/get_products_clicked/`, { headers: headers })
      .then(res => {
        let datan = JSON.parse(res.data);
        setproduct(datan);
      });
  }, []);
  return (
    <div className="product-clicked">
      <h5 className="mb-1 mt-3">
        <b>Recently Clicked</b>
      </h5>
      <div className="p-3 bg-white rounded canvas-container">
        {products.length > 0 ? (
          products.map(items => <p>{items.name}</p>)
        ) : (
          <p className="text-center">Loading</p>
        )}
      </div>
    </div>
  );
}
