import React, { Component } from "react";

export default class ProductModal extends Component {
  state = {
    productName: "",
    productImage: "",
    productPrice: "",
    description: ""
  };

  componentDidMount() {
    const { product } = this.props;
    this.setState({
      productName: product.name,
      productPrice: product.price,
      description: product.description,
      productImage: product.image
    });
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (prevProps.product !== product) {
      this.setState({
        productName: product.name,
        productPrice: product.price,
        description: product.description,
        productImage: product.image
      });
    }
  }

  render() {
    const { productName, description, productImage } = this.state;
    return (
      <div className="text-center">
        <img src={productImage} className="img-fluid" alt={productName} />
        <h3>{productName}</h3>
        <p>{description}</p>
        <span className="btn btn-success btn-block">Contact whatsapp</span>
      </div>
    );
  }
}
