/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import React, { Component } from "react";

import url from "../config/url";

class ProductDetail extends Component {
  state = {
    showContent: true,
    results: []
  };

  componentDidMount() {
    this.setPostStateOnProps();
  }

  setPostStateOnProps() {
    const { results } = this.props;
    this.setState({
      results: results
    });
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props !== prevProps) {
      this.setPostStateOnProps();
    }
  }
  render() {
    const { results } = this.state;
    return (
      <div>
        <div className="row">
          {results.map((item, key) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              key={`${item.idd}-${item.name}-${key}`}
            >
              <a
                href={`${url}/api/r_redirect/${
                  item.id ? item.id : item.objectID
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="product_d text-dark"
              >
                <div
                  className={`snpt ${item.idd}-${item.name}-${key}`}
                  key={`${item.idd}-${item.name}-${key}`}
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
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductDetail;
