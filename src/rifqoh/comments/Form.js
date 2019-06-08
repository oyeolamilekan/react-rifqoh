import React, { Component } from "react";

import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default class Form extends Component {
  state = {
    textbox_value: "",
    sending: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { objId, objType } = this.props;
    this.setState({ sending: true });
    axios
      .post(`${url}/api/create_comments/${objId}/${objType}/`, this.state, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.props.addComments(res.data);
        this.setState({ textbox_value: "", sending: false });
      });
  };

  /**
   * This handles the changes made by the user
   * and automatically assigns it to the state
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { textbox_value, sending } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Kindly enter comments"
              onChange={this.handleChange}
              name="textbox_value"
              value={textbox_value}
              disabled={sending}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark btn-sm rounded float-right"
          >
            <i className="fa fa-comments" /> Post
          </button>
        </form>
      </div>
    );
  }
}
