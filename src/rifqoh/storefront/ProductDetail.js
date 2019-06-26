/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import React, { Component } from "react";

import ProductModal from "./ProductModal";
import axios from "axios";
import url from "../config/url";

class ProductDetail extends Component {
  state = {
    showContent: true,
    results: [],
    detailData: {},
    clicked: false
  };

  componentDidMount() {
    this.setPostStateOnProps();
  }

  setPostStateOnProps() {
    const { results } = this.props;
    this.setState({
      results: results
    });
    // console.log(results);
  }

  create_analytics = id => {
    axios.get(`${url}/api/create_analytics_product/${id}/`).then(res => {
      console.log(res);
    });
  };
  
  // Pass the data needed to edit the product
  detailProducts = data => {
    this.setState({
      detailData: data,
      clicked: true
    });
    this.create_analytics(data.id);
  };

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props !== prevProps) {
      this.setPostStateOnProps();
    }
  }
  render() {
    const { results, clicked, detailData } = this.state;
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          {results.map((item, key) => (
            <div
              className="col-lg-3 col-md-5 col-sm-6 col-xs-12"
              key={`${item.id}-${item.name}-${key}`}
            >
              <span
                data-toggle="modal"
                data-target="#ProductDetail"
                rel="noopener noreferrer"
                onClick={() => this.detailProducts(item)}
                className="product_d text-dark pointer"
              >
                <div
                  className={`snpt ${item.id}-${item.name}-${key}`}
                  key={`${item.id}-${item.name}-${key}`}
                >
                  {/* <img src={item.image.indexOf('local') > -1 ? item.image : item.image.indexOf('media') > -1 ? 'http://localhost:8000'+ item.image : 'http://localhost:8000/media/'+ item.image } alt={item.name} className='img-prod' /> */}
                  <img
                    src={
                      item.image.indexOf("res") > -1
                        ? item.image
                        : "https://res.cloudinary.com/dbwm0ksoi/image/upload/v1/" +
                          item.image
                    }
                    alt={item.name}
                    className="img-prod mt-5"
                  />
                  <div className="price-tag bg-dark">
                    <span>&#8358;</span>
                    {item.price}
                  </div>
                  <hr />
                  <div className="product-name mt-4 p-2">
                    <p>
                      {item.name.length > 50
                        ? item.name.slice(0, 50) + "...."
                        : item.name}
                    </p>
                  </div>

                  <p>{item.shop}</p>
                </div>
              </span>
            </div>
          ))}
        </div>
        {/* Edit Product modal */}
        <div className="modal" id="ProductDetail">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">{ clicked ? <ProductModal product={detailData}/> : ""}</div>
              {/* End Modal body */}
            </div>
          </div>
        </div>
        {/* End Edit product modal */}
      </div>
    );
  }
}

export default ProductDetail;
