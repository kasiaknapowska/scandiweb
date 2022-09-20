import "./_ProductDetails.scss";

import React, { Component } from "react";
import { connect } from "react-redux";


import { addCount } from "../../redux/counterSlice";
import {
  addtoCart,
  editAttributes,
} from "../../redux/cartSlice";

import parse from "html-react-parser";

import Attributes from "../Attributes";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributesChosen: {},
    };
    this.setAttributes = this.setAttributes.bind(this);
  }

  setAttributes(name, value) {
    this.setState((prevState) => ({
      attributesChosen: { ...prevState.attributesChosen, [name]: value },
    }));
  }

  render() {
    const price = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );

    console.log(this.state.attributesChosen);

    return (
      <div className="product_details">
        <div>
          <h1>{this.props.product.name}</h1>
          <h2>{this.props.product.brand}</h2>
        </div>
        {this.props.product.attributes.map((attribute, index) => {
          return (
            <div key={attribute.id + index}>
              <h3>{attribute.name}</h3>
              <Attributes
                attribute={attribute}
                setAttributes={this.setAttributes}
                attributesChosen={this.state.attributesChosen}
              />
            </div>
          );
        })}
        <div>
          <h3>Price</h3>
          <p className="product_price">
            {price[0].currency.symbol} <span style={{ width: "2px" }}></span>
            {price[0].amount.toFixed(2)}
          </p>
        </div>
        <button>Add to cart</button>
        {parse(this.props.product.description)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

const mapDispatchToProps = {
  addCount,
  addtoCart,
  editAttributes,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
