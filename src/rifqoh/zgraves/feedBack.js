import React, { Component } from "react";

import Axios from "axios";
import Loading from "react-spinners/ClipLoader";
import url from "../config/url";

class FeedBack extends Component {
  state = {
    score: "",
    email: "",
    message: "",
    loading: false,
    error: false,
    sent: false
  };

  // Handles the value input
  // And changes the state in other
  // To send the value to the server
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Submits the form data to the API
  // And does some cool animation
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { score, email, message } = this.state;
    if (score && email && message) {
      Axios.post(`${url}/api/create/`, {
        score: score,
        email: email,
        message: message
      })
        .then(res => {
          this.setState({
            sent: true,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }
  };
  render() {
    const { sent, error, loading } = this.state;
    return (
      <div className="modal-container">
        <a
          href="/#"
          className="float"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="uil uil-comment-alt-medical my-float" />
        </a>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Send us feedback
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {loading ? (
                  <div className="text-center">
                    <Loading sizeUnit={"px"} size={95} />
                  </div>
                ) : sent ? (
                  <div className="text-center">
                    <h1>
                      <i className="fa fa-check text-success" />
                    </h1>
                    <h3 className="font-weight-light">
                      Thanks for the feedback.
                    </h3>
                    <p className="font-weight-light">
                      We promise to work on it.
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center">
                    <h1>
                      <i className="fa fa-times text-danger" />
                    </h1>
                    <h5 className="font-weight-light">
                      Something bad happened
                    </h5>
                  </div>
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">
                        How was the service?
                      </label>
                      <select
                        required
                        className="form-control"
                        onChange={this.handleChange}
                        name="score"
                      >
                        <option defaultValue value="">
                          Choose ......
                        </option>
                        <option>Bad</option>
                        <option>Fair</option>
                        <option>Good</option>
                        <option>Very Good</option>
                        <option>Excellent</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={this.handleChange}
                        name="email"
                        required
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Please say nice things."
                        onChange={this.handleChange}
                        name="message"
                        required
                      />
                    </div>
                    <div className="btn-container">
                      <button
                        type="submit"
                        className="btn btn-dark btn-block rounded-btn"
                      >
                        <i className="fa fa-paper-plane" /> Send
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedBack;
