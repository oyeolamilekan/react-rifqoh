import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import Nav from "../navTypes/commerceNav";
import Token from "../utils";
import axios from "axios";
import strip from "../strip.png";
import url from "../url";

export default class ChangePassword extends Component {
  state = {
    old_password: "",
    new_password: "",
    loading: false,
    success: false,
    failed: false
  };
  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      failed: false,
      success: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { old_password, new_password } = this.state;
    this.setState({
      loading: true
    });
    axios
      .put(
        `${url}/api/change_password/`,
        {
          old_password: old_password,
          new_password: new_password
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        }
      )
      .then(() => {
        this.setState({
          success: true,
          loading: false,
          new_password:"",
          old_password:""
        });
      })
      .catch(() => {
        this.setState({
          failed: true,
          loading: false,
          new_password:"",
          old_password:""
        });
      });
  };

  render() {
    const { loading, failed, success, old_password, new_password } = this.state;
    return (
      <div>
        <Nav />
        <div className="col-md-4 offset-md-4 mt-3">
          <div className="p-3 bg-white text-center shadow rounded">
            <img src={strip} className="reg-img" alt="logo" />
            {failed ? (
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
            ) : success ? (
              <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Success!!</strong> Your password has been successfully updated..
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
            <form className="mt-3" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword1"
                  placeholder="Old Password"
                  name="old_password"
                  value={old_password}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword2"
                  placeholder="New Password"
                  name="new_password"
                  value={new_password}
                  required
                  onChange={this.handleChange}
                />
              </div>
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
                  <div className="login-text">Submit</div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
