import React, { Component } from "react";

export default class FeedBack extends Component {
  state = {
    topic: "",
    description: ""
  };
  
  // Handles the value input
  // And changes the state in other
  // To send the value to the server
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { topic, description } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Topic</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Topic"
              onChange={this.handleChange}
              name="topic"
              value={topic}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Kindly enter the description."
              onChange={this.handleChange}
              name="description"
              value={description}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn btn-dark btn-block rounded">
              <i className="fa fa-paper-plane" /> Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
