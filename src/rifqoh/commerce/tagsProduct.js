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
    shop_category: [],
    categoryName: "",
    loading: true,
    sent: false,
    error: false
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
        console.log(res.data.shop_categories);
        this.setState({
          shop_category: res.data.shop_categories,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { categoryName } = this.state;
    const data = { categoryName };
    axios
      .post(`${url}/api/create_tags/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          shop_category: [...this.state.shop_category, res.data],
          loading: false,
          sent: true
        });
      })
      .catch(() => {
        console.log('kii')
        this.setState({
          sent: false,
          error: true,
          loading: false
        });
      });
  };

  handleDismiss = event => {
    event.preventDefault();
    this.setState({
      sent: false,
      error: false
    });
  };

  render() {
    const shopName = localStorage.getItem("shopName");
    const { shop_category, loading, sent, categoryName, error } = this.state;
    return (
      <div>
        <Nav name={shopName} />
        <div className="col-md-6 offset-md-3 mt-2">
          <div className="shadow p-4 mt-2 mb-3 bg-white rounded text-center">
            {loading ? (
              <div className="text-center">
                <Loading />
              </div>
            ) : shop_category.length > 0 ? (
              <div className="text-center">
                <div className="tags">
                  {shop_category.map((tags, index) => {
                    return (
                      <span
                        className="bg-tags p-1 text-white rounded mr-2"
                        key={index}
                      >
                        {jsUcfirst(tags.name)}
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
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="mb-3">
                  {loading ? (
                    <div className="text-center">Loading..</div>
                  ) : sent ? (
                    <div
                      className="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Successful</strong> the tag has been created.
                      <button
                        type="button"
                        className="close"
                        onClick={this.handleDismiss}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : error ? (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Failed</strong> something bad happend.
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
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Create a category."
                      onChange={this.handleChange}
                      name="categoryName"
                      value={categoryName}
                      required
                    />
                  </div>
                  <button className="btn btn-dark btn-block btn-lg">
                    {loading ? (
                      <Loading color={"white"} sizeUnit={"px"} size={13} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
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
