/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import React, { Component } from "react";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.toogleContent = this.toogleContent.bind(this);
    this.counter = this.counter.bind(this);
    this.state = {
      activeContent: false,
      num: this.props.genr.id
    };
  }
  toogleContent(event) {
    event.preventDefault();
    const { activeContent } = this.state;
    this.setState({
      activeContent: !activeContent
    });
  }
  counter(event) {
    this.setState(prevState => ({
      num: prevState.num + 1
    }));
  }
  render() {
    const { activeContent, genr } = this.state;

    return (
      <div
        className={activeContent ? "contt" : "kkk"}
      >
        {genr.title}
        <button onClick={this.counter}>{this.state.num}</button>
      </div>
    );
  }
}

export default PostDetail;
