import React, { Component } from "react";

import AddProduct from "./AddProduct";
import EditProducts from "./EditProducts";
import Loading from "react-spinners/BeatLoader";
import Nav from "../navTypes/commerceNav";
import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

class cProducts extends Component {
  state = {
    productList: [],
    isNext: "",
    loading: true,
    editProduct: {},
    deleteData: "",
    deleteLoading: false,
    deleteSuccess: false,
    clicked: false,
    error: false
  };

  // React auto runs this component when the components
  // Loads
  componentDidMount() {
    axios
      .get(`${url}/api/shop_products/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          productList: res.data.results,
          isNext: res.data.next ? res.data.next.replace(url, "") : "",
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  // Load more products when the user clicked
  // the next button
  loadMore = () => {
    const { isNext } = this.state;
    if (isNext !== "") {
      let next = `${url}${isNext}`;
      axios
        .get(next, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token()}`
          }
        })
        .then(res => {
          this.setState({
            productList: [...this.state.productList, ...res.data.results],
            isNext: res.data.next ? res.data.next.replace(url, "") : ""
          });
        });
    }
  };

  // Recieves the product from the add product function
  addProducts = data => {
    this.setState({
      productList: [data, ...this.state.productList]
    });
  };

  // Pass the data needed to edit the product
  editProducts = data => {
    this.setState({
      editProduct: data,
      clicked: true
    });
  };

  // Recieves the edited the edited form data
  editProductData = data => {
    const { productList } = this.state;
    var foundIndex = productList.findIndex(x => x.id === data.id);
    productList[foundIndex] = data;
    this.setState({
      productList: productList
    });
  };

  deleteProducts = data => {
    this.setState({
      deleteData: data,
      deleteSuccess: false
    });
  };

  confirmDelete = () => {
    let { productList, deleteData } = this.state;

    productList = productList.filter(i => {
      return i.id !== deleteData.id;
    });

    this.setState({
      deleteLoading: true
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${Token()}`
    };
    console.log(deleteData, Token());
    axios
      .delete(`${url}/api/delete_products/`, { data: deleteData, headers })
      .then(() => {
        this.setState({
          productList,
          deleteLoading: false,
          deleteSuccess: true
        });
      });
  };

  render() {
    const {
      productList,
      isNext,
      clicked,
      editProduct,
      loading,
      deleteLoading,
      deleteSuccess,
      error
    } = this.state;
    return (
      <div>
        <Nav />
        <div className="pl-3 pr-3">
          <div>
            <div className="p-3 shadow mt-2 bg-white rounded mb-4 table-responsive">
              {loading ? (
                <div className="text-center">
                  <Loading />{" "}
                </div>
              ) : error ? (
                <div className="text-center">
                  There an error with your internet connection
                </div>
              ) : productList.length > 0 ? (
                <div className="product-list table-responsive">
                  <table className="table borderless">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((item, key) => (
                        <tr className="tr-hover" key={key}>
                          <td>
                            {item.name.length > 50
                              ? item.name.slice(0, 50) + "...."
                              : item.name}
                          </td>
                          <td>{item.price}</td>
                          <td>{item.genre.name}</td>
                          <td>
                            <span className="bg-success p-1 rounded text-white">
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className="btn btn-sm btn-dark dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Actions
                              </span>
                              <div className="dropdown-menu dropdown-menu-left">
                                <span
                                  className="dropdown-item pointer"
                                  onClick={() => this.editProducts(item)}
                                  data-toggle="modal"
                                  data-target="#editProduct"
                                >
                                  <i className="far fa-edit" /> Edit Product
                                </span>
                                <span
                                  className="dropdown-item pointer"
                                  data-toggle="modal"
                                  data-target="#deleteProduct"
                                  onClick={() => this.deleteProducts(item)}
                                >
                                  <i className="far fa-trash-alt" /> Delete
                                  product
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isNext.length > 0 ? (
                    <div className="text-center">
                      <span
                        className="btn btn-dark btn-sm"
                        onClick={this.loadMore}
                      >
                        Load More
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="text-center h5 mt-1">
                  You have no products, kindly hit the add prodcuts button.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Product modal */}
        <div className="modal" id="editProduct">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Edit Product</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                {clicked ? (
                  <EditProducts
                    product={editProduct}
                    editProductData={this.editProductData}
                  />
                ) : (
                  ""
                )}
              </div>
              {/* End Modal body */}
            </div>
          </div>
        </div>
        {/* End Edit product modal */}

        {/* Delete Product modal */}
        <div className="modal" id="deleteProduct">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header text-center">
                <h4 className="modal-title">Delete Product</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                {deleteLoading ? (
                  <div className="text-center">
                    <Loading />
                  </div>
                ) : deleteSuccess ? (
                  <p className="text-center">
                    You successfully deleted the data.
                  </p>
                ) : (
                  <div>
                    <p className="text-center">
                      This product will be deleted permanently. Do you want to
                      continue?
                    </p>
                    <div className="float-left">
                      <span
                        className="btn btn-sm btn-light"
                        data-dismiss="modal"
                      >
                        Cancel
                      </span>
                    </div>
                    <div className="float-right">
                      <span
                        className="btn btn-sm btn-danger"
                        onClick={this.confirmDelete}
                      >
                        Yes, Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* End Modal body */}
            </div>
          </div>
        </div>
        {/* End Delete product modal */}

        {/* <!-- The Modal --> */}
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Add Product</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <AddProduct addProducts={this.addProducts} />
              </div>
              {/* End Modal body */}
            </div>
          </div>
        </div>
        {/* End Modal */}

        {/* Start modal btn */}
        <span
          className="btn btn-dark btn-lg float-btn navbar-btn mt-2 text-white"
          data-toggle="modal"
          data-target="#myModal"
        >
          <i className="fas fa-plus" /> Add Product
        </span>
        {/* End Modal btn */}
      </div>
    );
  }
}

export default cProducts;
