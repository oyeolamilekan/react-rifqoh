/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import React, { Component } from "react";

import { Link } from "react-router-dom";
import Loading from "react-spinners/BeatLoader";
import Progress from "react-progress-2";
import axios from "axios";
import strip from "../strip.png";
import url from "../url";

class SignUp extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    error: false,
    errorMessage: ""
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
    const { password, email, name } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post(`${url}/api/register/`, {
        email: email,
        password: password,
        name: name,
        is_commerce: true
      })
      .then(res => {
        const { token, name, is_admin } = res.data;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("username", name);
        localStorage.setItem("is_commerce", true);
        localStorage.setItem("is_admin", is_admin);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        JSON.parse(localStorage.getItem("is_commerce"))
          ? this.props.history.push("/create/shop")
          : this.props.history.push("/");
      })
      .catch(er => {
        console.log(er.response);
        const err = er.response.data;
        if (err.username) {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "A user with that username already exists."
          });
        } else if (err.email) {
          this.setState({
            loading: false,
            error: true,
            errorMessage:
              "A user is already registered with this e-mail address."
          });
        } else if (err.non_field_errors) {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "The two password fields didn't match."
          });
        } else {
          this.setState({
            loading: false,
            error: true,
            errorMessage: `${JSON.stringify(
              err.response.data.non_field_errors
            )} ${JSON.stringify(err.email[0])} ${JSON.stringify(
              err.username[0]
            )} `
          });
        }
      });
  };
  render() {
    const { loading, errorMessage, error } = this.state;
    const { is_commerce } = this.props.location;
    return (
      <div className="col-md-4 offset-md-4">
        <div className="bg-white shadow rounded login mt-10">
          <div className="img-container text-center p-3">
            <img src={strip} className="reg-img" alt="logo" />
          </div>
          <div className="login-container p-3">
            {error["username"]}
            {error}
            {error ? (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {errorMessage}
                <button
                  type="button"
                  className="close"
                  onClick={this.handleDismiss}
                >
                  <span aria-hidden>&times;</span>
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
                  id="InputName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  name="name"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="mt-4" />
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="mt-4" />
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword1"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={this.handleChange}
                />
              </div>

              <div className="mt-4" />
              <div className="btn-submit">
                <button
                  type="submit"
                  className="btn btn-block btn-dark p-3 btn-shadow-dark"
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
                    <div className="login-text">
                      Create My {is_commerce ? "Commerce" : "Account"}
                    </div>
                  )}
                </button>
              </div>
              <div className="mt-4" />
            </form>
          </div>
          <div className="p-4 bg-auth-container m-0 text-center rounded-bottom">
            Have an account? <Link to="/login">Login</Link>.
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
