import React, { Component } from "react";

import Token from "../utils/utils";
import axios from "axios";
import { delimitNumbers } from "../utils/utils";
import url from "../config/url";

export default class AddProduct extends Component {
  state = {
    productName: "",
    productPrice: "",
    description: "",
    chossenTags: [],
    tags: "",
    file: "",
    fileName: "",
    loading: false,
    sent: false,
    error: false
  };

  fileInput = React.createRef();
  baseState = this.state;

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
          chossenTags: res.data.shop_categories
        });
      })
      .catch(err => {
        this.setState({
          is_exist: true
        });
      });
  }

  // Handle the uploaded file
  // and update it to the state
  handelOnUploadFile = event => {
    this.setState({
      file: event.target.files[0],
      fileName: event.target.files[0].name
    });
  };

  // Handles the value input
  // And changes the state in other
  // To send the value to the server
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Submits the form data to the API
  // And does some cool animation
  handleSubmit = event => {
    event.preventDefault();
    event.target.reset();
    this.setState({
      loading: true,
      sent: false
    });
    // Get the data from the form state.
    const { productName, productPrice, description, file, tags } = this.state;

    // Create form data object
    const data = new FormData();
    data.append("file", file);
    data.append("productName", productName);
    data.append("productPrice", productPrice);
    data.append("description", description);
    data.append("tags", tags);

    // Send a post request to the server with
    // needed information
    axios
      .post(`${url}/api/create_product/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.props.addProducts(res.data.product);
        this.setState({
          sent: true,
          productName: "",
          productPrice: "",
          description: "",
          fileName: ""
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
  };
  render() {
    const {
      chossenTags,
      productPrice,
      description,
      productName,
      sent,
      error,
      loading,
      fileName
    } = this.state;
    return (
      <div>
        {sent ? (
          <div className="text-center">Success.</div>
        ) : loading ? (
          <div className="text-center">Sending please wait.</div>
        ) : error ? (
          <div className="text-center">Something bad happened.</div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Product name"
              onChange={this.handleChange}
              name="productName"
              value={productName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Product price</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Price"
              value={productPrice}
              name="productPrice"
              required
              onChange={event =>
                this.setState({
                  productPrice: delimitNumbers(event.target.value.toString())
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="productTags">Product tags</label>
            <select
              className="form-control"
              onChange={this.handleChange}
              name="tags"
              required
            >
              <option defaultValue value="">
                Choose category..
              </option>
              {chossenTags.map((e, key) => {
                return (
                  <option key={key} value={JSON.stringify(e)}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
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
          <label>Product image</label>

          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            accept=".png, .jpg, .jpeg"
            ref={this.fileInput}
            onChange={this.handelOnUploadFile}
          />
          <label htmlFor="file">{fileName ? fileName : "Choose a file"}</label>
          <button className="btn btn-dark btn-block rounded">
            <i className="fa fa-paper-plane" /> Save
          </button>
        </form>
      </div>
    );
  }
}
