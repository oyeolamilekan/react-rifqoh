import React, { Component } from "react";

import Token from "../utils";
import axios from "axios";
import { delimitNumbers } from "../utils";
import url from "../url";

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

  baseState = this.state;

  componentDidMount() {
    console.log("hello", this.props.product);
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
      .catch(err => {
        this.setState({
          is_exist: true
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    console.log(product);
    if (prevProps.product !== product) {
      this.setState({
        productName: product.name,
        productPrice: product.price,
        description: product.description,
        productId: product.id,
        tags: product.genre,
        fileName: "",
        sent: false,
        loading: false
      });
    }
  }

  // Handle the uploaded file
  // and update it to the state
  handelOnUploadFile = event => {
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
    console.log(this.props.product.id);
    event.preventDefault();
    event.target.value = null;
    this.setState({
      loading: true
    });
    // Stop the form from submitting
    event.preventDefault();

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
    data.append("tags", typeof(tags) !== 'string' ? JSON.stringify(tags) : tags);
    data.append("id", productId);
    // Send a post request to the server with
    // needed information
    axios
      .post(`${url}/api/edit_products/`, data, {
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
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        });
      });
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
        ) : (
          ""
        )}
        {mounting ? (
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
              <label htmlFor="exampleFormControlSelect1">Product tags</label>
              <select
                className="form-control"
                onChange={this.handleChange}
                name="tags"
                value={tags}
                required
              >
                <option defaultValue={tags}>
                  {tags.name}
                </option>
                {shop_category.map((e, key) => {
                  return e.name !== this.props.product.genre.name ? (
                    <option key={key} value={JSON.stringify(e)}>
                      {e.name}
                    </option>
                  ) : (
                    ""
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
            <label>Product image</label>
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={this.handelOnUploadFile}
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
