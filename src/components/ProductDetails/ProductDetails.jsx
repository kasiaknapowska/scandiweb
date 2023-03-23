import "./_ProductDetails.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import withBusinessLogic from "../../utils/hoc/withBusinessLogic";
import { getPrice } from "../../utils/functions";
import Attributes from "../Attributes";

class ProductDetails extends PureComponent {
  render() {
    const price = getPrice(this.props.product.prices, this.props.currency);
    return (
      <div className="product_details">
        {!this.props.product.inStock && <p>Out of stock</p>}
        <div>
          <h1>{this.props.product.name}</h1>
          <h2>{this.props.product.brand}</h2>
        </div>
        {this.props.product.attributes.length > 0 &&
          this.props.product.attributes.map((attribute, index) => {
            return (
              <div key={attribute.id + index}>
                <h3>{attribute.name}</h3>
                <Attributes
                  attribute={attribute}
                  setAttributes={this.props.setAttributes}
                  attributesChosen={this.props.attributesChosen}
                  isClickable={true}
                />
              </div>
            );
          })}
        <div>
          <h3>Price</h3>
          <p className="product_price">
            {this.props.currency} <span style={{ width: "2px" }}></span>
            {price}
          </p>
        </div>
        {this.props.product.inStock && (
          <div className="button_container">
            <button
              className="btn_primary"
              onClick={() =>
                this.props.addItemWithChosenAttributes(this.props.product)
              }
            >
              Add to cart
            </button>
            {this.props.attributesError && (
              <span className="error">{this.props.attributesError}</span>
            )}
          </div>
        )}
        {this.props.product.description.includes("<") ? (
          parse(this.props.product.description)
        ) : (
          <p>{this.props.product.description}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  count: state.cartCounter.count,
  cart: state.cart.items,
});

export default withBusinessLogic(connect(mapStateToProps)(ProductDetails));
