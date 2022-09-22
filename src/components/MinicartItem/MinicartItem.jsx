import React, { Component } from "react";
import { connect } from "react-redux";
import Attributes from "../Attributes";
import "./_MinicartItem.scss";

class MinicartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.item);
    return (
      <div className="minicart_item">
        <div className="minicart_item_details">
          <h2>
            {this.props.item.name}
            <br></br>
            {this.props.item.brand}
          </h2>
          <h3>
            {
              this.props.item.prices.filter(
                (price) => price.currency.symbol === this.props.currency
              )[0].currency.symbol
            }{" "}
            <span style={{ width: "2px" }}></span>
            {this.props.item.prices
              .filter(
                (price) => price.currency.symbol === this.props.currency
              )[0]
              .amount.toFixed(2)}
          </h3>
          <div>
            {this.props.item.attributes.map((attribute, index) => {
              return (
                <div key={attribute.id + index}>
                  <p>{attribute.name}</p>
                  <Attributes
                    attribute={attribute}
                    attributesChosen={this.props.item.attributesChosen}
                    onClick={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="minicart_item_quantity">
          <div>+</div>
          <h3>{this.props.item.quantity}</h3>
          <div className="substract">-</div>
        </div>
        <div
          className="minicart_item_img"
          style={{ backgroundImage: `url(${this.props.item.gallery[0]})` }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // cart: state.cart.items,
  // count: state.cartCounter.count,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(MinicartItem);
