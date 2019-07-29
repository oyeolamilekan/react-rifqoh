/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import "react-progress-2/main.css";

import React, { Component } from "react";

import { Link } from "react-router-dom";
import Loading from "react-spinners/BeatLoader";
import Logo from "../imgs/strip.png";
import Progress from "react-progress-2";
import axios from "axios";
import url from "../config/url";

class Login extends Component {
  state = {
    email: "",
    password: "",
    shop_name: "",
    error: false
  };

  componentDidMount() {
    Progress.hide();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      error: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { password, email } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post(`${url}/api/login/`, {
        email: email.toLowerCase(),
        password: password
      })
      .then(res => {
        console.log(res.data);
        const {
          token,
          name,
          is_commerce,
          is_admin,
          shop_name,
          shop_logo,
          shop_slug
        } = res.data;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("username", name);
        localStorage.setItem("is_commerce", is_commerce);
        localStorage.setItem("is_admin", is_admin);
        localStorage.setItem("token", token);
        localStorage.setItem("logo", shop_logo);
        localStorage.setItem("shopSlug", shop_slug);
        localStorage.setItem("shopName", shop_name);
        localStorage.setItem("expirationDate", expirationDate);
        shop_name.length > 0
          ? this.props.history.push("/commerce/home")
          : this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false
        });
      });
  };

  render() {
    const { loading, error } = this.state;
    return (
      <div className="col-md-4 offset-md-4 middle-belt">
        <div className="bg-white shadow rounded h-50 login">
          <div className="login-container p-3">
            <div className="img-container text-center">
              <img src={Logo} className="reg-img" alt="logo" />
            </div>
            <div className="mt-4" />
            {error ? (
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>Wrong credentials</strong> Kindly check does field and
                try again.
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
                  type="email"
                  className="form-control"
                  id="InputUsername"
                  aria-describedby="helpUsername"
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                  required
                />
              </div>
              <div className="mt-2" />
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="btn-submit mt-2">
                <button
                  type="submit"
                  className="btn btn-block btn-dark pl-3 btn-shadow-dark"
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <span className="spinner">
                      <Loading
                        color={"white"}
                        sizeUnit={"px"}
                        size={13}
                        className={"spinner-logo"}
                      />
                    </span>
                  ) : (
                    <div className="login-text">Login to your account</div>
                  )}
                </button>
              </div>
              <div className="mb-4" />
              <div className="mb-4" />
              <div className="mb-4" />
            </form>
          </div>
          <div className="p-4 bg-auth-container m-0 text-center rounded-bottom">
            Don't have an account? <Link to="/commerce/signup">Sign up</Link>.
            <br />
            Forgot your password <Link to="/commerce/reset">click here.</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
