import React, { Component } from "react";

import Loading from "react-spinners/BeatLoader";
import Nav from "../navTypes/commerceNav";
import Token from "../utils";
import axios from "axios";
import { jsUcfirst } from "../utils";
import url from "../url";

export default class tagsProduct extends Component {
  /**
   * tagsArray -> {TYPE: array} -> Contains the number of tags from server
   * chossenTags -> {TYPE: array} -> Contains the tags that was choosen by the merchant
   * loading -> {TYPE: bool} -> Shows the loading icon to show user, that the component has mounted
   * sent -> {TYPE: bool} -> Shows sent status when the user has successfully saved the info
   */
  state = {
    tagsArray: [],
    chossenTags: [],
    parentArray: [],
    title: "",
    loading: true,
    childLoaded: false,
    backButton: false,
    sent: false,
    titleTag: ""
  };

  componentDidMount() {
    axios
      .get(`${url}/api/catergory_list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          chossenTags: res.data.choosen_catergory
            ? res.data.choosen_catergory
            : [],
          parentArray: res.data.catergory_serializer,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          is_exist: true
        });
      });
  }

  // Open the childs card
  chossenParentTags = (e, data) => {
    e.preventDefault();
    this.setState({
      childLoaded: true,
      tagsArray: data.tags,
      titleTag: data.title,
      backButton: true
    });
  };

  // Open the back button
  backButtonClicked = e => {
    e.preventDefault();
    this.setState({
      childLoaded: false,
      backButton: false,
      titleTag: ""
    });
  };

  submitTag = e => {
    e.preventDefault();
    const { chossenTags } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post(`${url}/api/create_tags/`, chossenTags, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          sent: true,
          loading: false
        });
      });
  };

  buttonPicker = (e, tags) => {
    e.preventDefault();
    const { chossenTags } = this.state;
    if (chossenTags.includes(tags)) {
      let newChossen = chossenTags.filter(e => {
        return e !== tags;
      });
      this.setState({
        chossenTags: newChossen
      });
    } else {
      this.setState({
        chossenTags: [...this.state.chossenTags, tags]
      });
    }
  };

  render() {
    const shopName = localStorage.getItem("shopName");
    const {
      tagsArray,
      chossenTags,
      loading,
      sent,
      parentArray,
      childLoaded,
      backButton,
      titleTag
    } = this.state;
    return (
      <div>
        <Nav name={shopName} />
        <div className="col-md-6 offset-md-3 mt-2">
          <div className="shadow p-4 mt-2 mb-3 bg-white rounded text-center">
            {loading ? (
              <div className="text-center">
                <Loading />
              </div>
            ) : chossenTags.length > 0 ? (
              <div className="text-center">
                <div className="tags">
                  {chossenTags.map((tags, index) => {
                    return (
                      <span
                        className="bg-tags p-1 text-white rounded mr-2"
                        key={index}
                      >
                        {jsUcfirst(tags)}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center">
                No tags added, kindly add more tags.
              </div>
            )}
          </div>
        </div>

        {/* Handle the tags of the product */}
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">{titleTag? titleTag: 'Add Tags'}</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="mb-4">
                  {loading ? (
                    <div className="text-center">Loading..</div>
                  ) : sent ? (
                    <div className="text-center">Successfull</div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Check if the child button is clicked */}
                {childLoaded
                  ? tagsArray.map((tags, index) => {
                      return (
                        <span
                          className={`p-2 border ml-1 tags-pointer pointer ${
                            chossenTags.includes(tags)
                              ? "bg-success text-white"
                              : ""
                          }`}
                          onClick={e => this.buttonPicker(e, tags)}
                          key={index}
                        >
                          {tags}
                        </span>
                      );
                    })
                  : parentArray.map((tags, index) => {
                      return (
                        <span
                          className="p-2 border ml-1 pointer"
                          onClick={e => this.chossenParentTags(e, tags)}
                          key={index}
                        >
                          {tags.title}
                        </span>
                      );
                    })}
                {/* End button */}
              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                {childLoaded ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mr-1"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm mr-1"
                      onClick={this.submitTag}
                    >
                      Save
                    </button>
                    {backButton ? (
                      <span
                        onClick={this.backButtonClicked}
                        className="btn btn-white btn-sm border"
                      >
                        <i className="uil uil-angle-left" />
                        Back
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End modal */}

        {/* Button that trigger the add tags modal */}
        <a
          href="/#"
          className={`btn btn-dark btn-lg h6 float-btn ${
            loading ? "disable-link" : ""
          }`}
          data-toggle="modal"
          data-target="#myModal"
        >
          Add Tags
        </a>
        {/* End button */}
      </div>
    );
  }
}
