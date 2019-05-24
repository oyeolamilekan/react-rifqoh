import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import Logo from "../imgs/strip.png";
import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

class createShop extends Component {
  state = {
    shopName: "",
    phoneNumber: "",
    shopCatergory: "",
    is_exist: false,
    isLoading: false
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
    this.setState({
      isLoading: true
    });
    const { shopName, shopCategory } = this.state;
    axios
      .post(
        `${url}/api/create_shop/`,
        {
          shopName: shopName,
          shopCategory: shopCategory
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
            is_exist: true,
            isLoading: false
          });
        } else {
          localStorage.setItem("shopName", shopName);
          localStorage.setItem("shopSlug", res.data.slug);
          this.props.history.push("/admin/tags");
        }
      })
      .catch(err => {
        this.setState({
          is_exist: true,
          isLoading: false
        });
      });
  };
  render() {
    const { is_exist, isLoading } = this.state;
    return (
      <div className="col-md-4 offset-md-4 middle-belt">
        <div className="container bg-white p-4 shadow rounded">
          <div className="img-container text-center mb-3">
            <img src={Logo} className="reg-img" alt="logo" />
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
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="InputShopName"
                aria-describedby="helpUsername"
                placeholder="Your phone number."
                onChange={this.handleChange}
                name="phoneNumber"
                required={true}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.handleChange}
                name="shopCategory"
                required
              >
                <option value="" disabled selected>
                  What are you into?
                </option>
                <option>Fashion</option>
                <option>Automobile</option>
                <option>Electronics & Gadgets</option>
              </select>
            </div>

            <div className="btn-submit mt-3">
              <button
                type="submit"
                className={`btn btn-block p-2 btn-dark text-white h6 btn-lg shadow ${
                  isLoading ? "disabled" : ""
                }`}
              >
                {isLoading ? (
                  <Loading color={"white"} sizeUnit={"px"} size={13} />
                ) : (
                  "Create Store"
                )}{" "}
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
