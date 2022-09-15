import "./_ProductDetails.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { changeCategory } from "../../redux/categorySlice";

import parse from "html-react-parser";
import TextType from "../Attributes/TextType";
import SwatchType from "../Attributes/SwatchType";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const price = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );

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
              {attribute.type === "text" && (
                <TextType items={attribute.items} />
              )}
              {attribute.type === "swatch" && (
                <SwatchType items={attribute.items} />
              )}
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

const mapDispatchToProps = { changeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
