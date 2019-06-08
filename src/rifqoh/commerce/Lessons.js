import React, { Component } from "react";

import Index from "../comments/Index";
import Nav from "../navTypes/commerceNav";
import Token from "../utils/utils";
import YouTube from "react-youtube";
import axios from "axios";
import url from "../config/url";

export default class Lesson extends Component {
  state = {
    videoList: []
  };
  componentDidMount() {
    axios
      .get(`${url}/api/lesson/index/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        const { results } = res.data;
        this.setState({
          videoList: results
        });
      })
      .catch(err => {
        this.setState({
          is_exist: true
        });
      });
  }
  render() {
    const { videoList } = this.state;
    return (
      <div>
        <Nav />
        <div className="col-md-6 offset-md-3 mt-3">
          {videoList.map((item, key) => (
            <div className="p-3 bg-white rounded shadow mb-4" key={key}>
              <div className="text-center">
                <div className="video-container">
                  <YouTube videoId={item.video_url} />
                </div>
                <h2 className="font-weight-light p-3">{item.title}</h2>
              </div>
              <Index objId={item.id} objType={"lesson"} />
              <span className="clearfix" />
            </div>
          ))}
          <div className="m-5" />
        </div>
      </div>
    );
  }
}
