import React, { Component } from "react";

import CommentList from "./CommentList";
import Form from "./Form";
import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default class Index extends Component {
  state = {
    comments: [],
    loading: true
  };
  componentDidMount() {
    const { objId, objType } = this.props;

    axios
      .get(`${url}/api/get_comments/${objId}/${objType}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => this.setState({ comments: res.data, loading: false }));
  }

  addComments = data => {
    this.setState({
      comments: [data, ...this.state.comments]
    });
  };

  render() {
    const { objId, objType } = this.props;
    const { comments, loading } = this.state;
    return (
      <div>
        {loading ? (
          <div className="text-center">Loading</div>
        ) : (
          <div>
            <Form
              objId={objId}
              objType={objType}
              addComments={this.addComments}
            />
            <CommentList comments={comments} />
          </div>
        )}
      </div>
    );
  }
}
