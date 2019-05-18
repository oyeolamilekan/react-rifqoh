import React, { Component } from "react";

import Token from "../utils";
import axios from "axios";
import strip from "../strip.png";
import url from "../url";

class createShop extends Component {
  state = {
    shopName: "",
    is_exist: false
  };

  // Handle text typed in by the user.
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Dismiss the error message
  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      is_exist: false
    });
  };

  // Submit the request
  handleSubmit = event => {
    event.preventDefault();
    const { shopName } = this.state;
    axios
      .post(
        `${url}/api/create_shop/`,
        {
          shopName: shopName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        }
      )
      .then(res => {
        const { is_exist } = res.data;
        if (is_exist) {
          this.setState({
            is_exist: true
          });
        } else {
          localStorage.setItem("shopName", shopName);
          localStorage.setItem("shopSlug", res.data.slug)
          this.props.history.push("/admin/tags");
        }
      })
      .catch(err => {
        this.setState({
          is_exist: true
        });
      });
  };
  render() {
    const { is_exist } = this.state;
    return (
      <div className="col-md-4 offset-md-4 middle-belt">
        <div className="container bg-white p-4 shadow rounded">
          <div className="img-container text-center mb-3">
            <img src={strip} className="reg-img" alt="logo" />
          </div>
          {is_exist ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Shop exists</strong> Kindly choose another store name.
              <button
                type="button"
                className="close"
                onClick={this.handleDismiss}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="InputShopName"
                aria-describedby="helpUsername"
                placeholder="Your store name"
                onChange={this.handleChange}
                name="shopName"
                required={true}
              />
            </div>
            <div className="btn-submit mt-3">
              <button
                type="submit"
                className="btn btn-block p-2 btn-dark text-white h6"
              >
                Create Store
              </button>
            </div>
            <div className="mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

export default createShop;
