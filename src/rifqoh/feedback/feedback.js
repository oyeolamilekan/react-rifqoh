import React, { Component } from "react";

import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default class FeedBack extends Component {
  state = {
    title: "",
    body: "",
    score: "",
    loading: false,
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

  handleDismiss = event => {
    this.setState({
      sent: false
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const data = this.state;
    axios
      .post(`${url}/api/create_feedback/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(() => {
        this.setState({
          sent: true,
          loading: false,
          title: "",
          body: "",
          score: ""
        });
      });
  };
  render() {
    const { title, body, score, sent, loading } = this.state;
    return (
      <div>
        {sent ? (
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <b>Sent</b> thanks for the feedback. again.
            <button
              type="button"
              className="close"
              onClick={this.handleDismiss}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : loading ? (
          <div
            class="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <b>Sending</b> your feedback is currently been sent.
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
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.handleChange}
              name="score"
              value={score}
              required
            >
              <option value="" disabled selected>
                How is the service?
              </option>
              <option value="great">Great</option>
              <option value="okay">Okay</option>
              <option value="medium">Medium</option>
              <option value="nice">Nice</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Topic"
              onChange={this.handleChange}
              name="title"
              value={title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Kindly enter the description."
              onChange={this.handleChange}
              name="body"
              value={body}
              required
            />
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className={`btn btn-dark btn-block rounded ${
                loading ? "disabled" : ""
              }`}
            >
              <i className="fa fa-paper-plane" />
              {loading ? "Sending...." : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
