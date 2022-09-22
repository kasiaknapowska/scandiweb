import "./_ProductDetails.scss";

import React, { Component } from "react";
import { connect } from "react-redux";

import { addCount } from "../../redux/counterSlice";
import { addToCart } from "../../redux/cartSlice";

import parse from "html-react-parser";

import Attributes from "../Attributes";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributesChosen: {},
      error: null,
    };
    this.setAttributes = this.setAttributes.bind(this);
  }

  setAttributes(id, value) {
    this.setState((prevState) => ({
      attributesChosen: {
        ...prevState.attributesChosen,
        [id.toLowerCase().replaceAll(" ", "-")]: value,
      },
    }));
  }

  addItemToCart({ id, name, brand, gallery, prices, attributes }, attributesChosen) {
    const areAttributesChosen = this.props.product.attributes.every(
      (attribute) =>
        Object.keys(attributesChosen).includes(attribute.id.toLowerCase().replaceAll(" ", "-"))
    );
   
    const item = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      attributesChosen,
    };
    if (areAttributesChosen) {
      this.setState({error: null})
      this.props.addCount();
      this.props.addToCart(item);
    } else {
      // this.setState({error: `Choose ${this.props.product.attributes.map(attribute => ` ${attribute.id} `)}`.replaceAll(',', '&' )})
      this.setState({error: `Choose options`})
    }
  }

  render() {
    const price = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
 
    console.log(this.props.count);
    console.log(this.props.cart);


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
                onClick={true}
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
        <div className="button_container">
        <button
        className="btn_primary"
          onClick={() =>
            this.addItemToCart(this.props.product, this.state.attributesChosen)
          }
        >
          Add to cart
        </button>
        {this.state.error && <span className="error">{this.state.error}</span>}
        </div>
       {this.props.product.description.startsWith("<") && parse(this.props.product.description)}
       {!this.props.product.description.startsWith("<") && <p>{this.props.product.description}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  count: state.cartCounter.count,
  cart: state.cart.items,
});

const mapDispatchToProps = {
  addCount,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
