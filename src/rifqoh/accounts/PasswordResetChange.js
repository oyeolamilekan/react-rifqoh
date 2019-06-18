import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import Logo from "../imgs/strip.png";
import axios from "axios";
import url from "../config/url";

export default class PasswordResetChange extends Component {
  state = {
    password_1: "",
    password_2: "",
    loading: true,
    error: false,
    errorPassWord: false,
    success: false,
    successMsg: "",
    valid: true,
    btnLoading: false,
    errorMsg: ""
  };
  componentDidMount() {
    const { token } = this.props.match.params;
    axios
      .get(`${url}/api/verify-token/${token}/`, { token: token })
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      errorPassWord: false,
      success: false
    });
  };

  onSubmit = event => {
    const { token } = this.props.match.params;
    event.preventDefault();
    const { password_1, password_2 } = this.state;
    if (password_1 !== password_2) {
      this.setState({
        errorPassWord: true,
        errorMsg: "Your password does not match"
      });
    } else if (password_1.length <= 4 && password_2.length <= 4) {
      this.setState({
        errorPassWord: true,
        errorMsg: "Your password is too short"
      });
    } else {
      this.setState({
        btnLoading: true
      });
      axios
        .post(`${url}/api/change-password/`, {
          password: password_1,
          token: token
        })
        .then(() => {
          this.setState({
            btnLoading: false,
            success: true,
            password_1: "",
            password_2: "",
            successMsg:
              "Password has been successfully been changed, kindly login."
          });
        });
    }
  };
  render() {
    const {
      loading,
      error,
      success,
      errorPassWord,
      successMsg,
      password_1,
      password_2,
      errorMsg,
      btnLoading
    } = this.state;
    return (
      <div className="col-md-4 offset-md-4 middle-belt">
        <div className="bg-white shadow rounded login p-3">
          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-center">This token does not exist, or it has been used.</div>
          ) : (
            <div className="login-container">
              <div className="text-center">
                <img src={Logo} className="reg-img" alt="logo" />
              </div>
              {success ? (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {successMsg}
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleDismiss}
                  >
                    <span aria-hidden>&times;</span>
                  </button>
                </div>
              ) : errorPassWord ? (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {errorMsg}
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
              <form onSubmit={this.onSubmit}>
                <div className="mt-4" />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword1"
                    placeholder="Password"
                    name="password_1"
                    required
                    value={password_1}
                    onChange={this.handleChange}
                    disabled={btnLoading ? true : false}
                  />
                </div>
                <div className="mt-2" />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword1"
                    placeholder="Type Password Again."
                    name="password_2"
                    required
                    value={password_2}
                    disabled={btnLoading ? true : false}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-dark pl-3 btn-shadow-dark"
                  disabled={btnLoading ? true : false}
                >
                  {btnLoading ? (
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
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
