import React, { Component } from "react";

import Moment from "react-moment";

export default class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="container">
        <div className="clearfix" />
        <div className="mt-4">
          {comments.map((item, index) => (
            <div className="border-left mb-4 pl-2 border-success">
              <div className="mb-1">Posted by {item.user}<br/>                           
              <Moment format={"YYYY-MM-DD - dddd - hh:mm A"}>{item.created}</Moment>
              </div>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
