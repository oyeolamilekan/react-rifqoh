import React, { Component } from "react";

import Token from "../utils/utils";
import axios from "axios";
import { delimitNumbers } from "../utils/utils";
import url from "../config/url";

export default class EditProducts extends Component {
  state = {
    productName: "",
    productPrice: "",
    description: "",
    productId: "",
    shop_category: [],
    tags: {},
    file: "",
    fileName: "",
    loading: false,
    mounting: true,
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
          shop_category: res.data.shop_categories,
          productName: this.props.product.name,
          productPrice: this.props.product.price,
          description: this.props.product.description,
          productId: this.props.product.id,
          tags: this.props.product.genre,
          mounting: false
        });
      })
      .catch(() => {
        this.setState({
          is_exist: true
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (prevProps.product !== product) {
      axios
        .get(`${url}/api/catergory_list/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        })
        .then(res => {
          this.setState({
            shop_category: res.data.shop_categories,
            productName: product.name,
            productPrice: product.price,
            description: product.description,
            productId: product.id,
            tags: product.genre,
            fileName: "",
            sent: false,
            loading: false
          });
        });
    }
  }

  // Handle the uploaded file
  // and update it to the state
  handelOnUploadEditFile = event => {
    this.setState({
      fileName: event.target.files[0].name,
      file: event.target.files[0]
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
    this.setState({
      loading: true
    });

    // Get the data from the form state.
    const {
      productName,
      productPrice,
      description,
      file,
      tags,
      productId
    } = this.state;

    // Create form data object
    const data = new FormData();

    // Append the data needed to the form
    data.append("file", file);
    data.append("productName", productName);
    data.append("productPrice", productPrice);
    data.append("description", description);
    data.append("tags", typeof tags !== "string" ? JSON.stringify(tags) : tags);
    data.append("id", productId);

    // Send a post request to the server with
    // needed information
    axios
      .put(`${url}/api/edit_products/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.props.editProductData(res.data.product);
        this.setState({
          sent: true
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
    // event.target.reset();
  };
  render() {
    const {
      shop_category,
      productPrice,
      description,
      productName,
      sent,
      error,
      mounting,
      loading,
      fileName,
      tags
    } = this.state;
    return (
      <div>
        {sent ? (
          <div className="text-center">Success.</div>
        ) : loading ? (
          <div className="text-center">Sending please wait.</div>
        ) : error ? (
          <div className="text-center">Something bad happened.</div>
        ) : mounting ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Product name</label>
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
              <label htmlFor="exampleInputEmail1">Product price</label>
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
              <label htmlFor="productTag">Product tags</label>
              <select
                className="form-control"
                onChange={this.handleChange}
                name="tags"
              >
                {shop_category.map((e, key) => {
                  return (
                    <option
                      key={key}
                      value={JSON.stringify(e)}
                      selected={e.name === tags.name}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
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
            <label>Product image </label>
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              ref={this.fileInput}
              onChange={this.handelOnUploadEditFile}
              accept=".png, .jpg, .jpeg"
            />
            <label htmlFor="file">
              {fileName ? fileName : "Choose a file"}
            </label>
            <div className="btn-container">
              <button type="submit" className="btn btn-dark btn-block rounded">
                <i className="fa fa-paper-plane" /> Save
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}
