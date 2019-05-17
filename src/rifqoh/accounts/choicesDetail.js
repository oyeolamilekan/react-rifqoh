/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import React, { Component } from "react";

import axios from "axios";
import url from "../url";

class CatDetail extends Component {
  constructor(props) {
    super(props);
    this.toogleContent = this.toogleContent.bind(this);
    this.state = {
      activeContent: this.props.hasIt
    };
  }


  toogleContent(event) {
    event.preventDefault();
    const { activeContent } = this.state;
    this.setState({
      activeContent: !activeContent
    });
    !activeContent ? this.props.counter() : this.props.decrement();
    axios.post(`${url}/api/create_o/`, {
      article: this.props.genr.title,
      user: localStorage.getItem("username")
    });
  }

  render() {
    const { genr } = this.props;
    const { activeContent } = this.state;
    return (
      <li
        className={
          activeContent ? "bg-success rounded p-1" : "bg-primary rounded p-1"
        }
        onClick={this.toogleContent}
        key={genr.title}
      >
        <span className="text-white">{genr.title}</span>
      </li>
    );
  }
}

export default CatDetail;
