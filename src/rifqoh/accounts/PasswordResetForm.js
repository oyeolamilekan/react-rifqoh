import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import Logo from "../imgs/strip.png";
import axios from "axios";
import url from "../config/url";

export default class PasswordResetForm extends Component {
  state = {
    email: "",
    loading: false,
    msg: "",
    alert: false
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({
      loading:true
    })
    event.preventDefault();
    const { email } = this.state;
    axios
      .post(`${url}/api/reset/`, { email: email })
      .then(res => {
        this.setState({
          msg: res.data.msg,
          alert: true,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          msg: "Email does not exist",
          alert: true,
          loading:false
        });
      });
  };

  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      alert: false
    });
  };

  render() {
    const { loading, msg, alert } = this.state;
    return (
      <div className="col-md-4 offset-md-4 middle-belt">
        <div className="bg-white shadow rounded login">
          <div className="login-container p-3">
            <div className="img-container text-center p-3">
              <img src={Logo} className="reg-img" alt="logo" />
            </div>
            <form onSubmit={this.handleSubmit}>
              {alert ? (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {msg}
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
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  name="email"
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
                    <div className="login-text">Reset Password.</div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
