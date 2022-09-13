import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../utils/router";
import classNames from "classnames";
import "./_Product.scss";
import cart from "../../assets/white-cart.svg";

class Product extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const image = this.props.product.gallery[0];
    const price = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    const inStock = this.props.product.inStock;

    return (
      <div
        className={classNames("product", { outOfStock: !inStock })}
        onClick={() =>
          inStock ? this.props.router.navigate(
            `${this.props.router.location.pathname}/${this.props.product.id}`
          ) : null
        }
      >
        <div className="product_img_container">
          {!inStock && <p>out of stock</p>}
          <div className="circle">
            <img src={cart} className="add_to_cart_icon" />
          </div>
          <img src={image} />
        </div>
        <h2 className="product_name">{this.props.product.name}</h2>
        <p className="product_price">
          {price[0].currency.symbol} <span style={{ width: "2px" }}></span>
          {price[0].amount.toFixed(2)}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

export default withRouter(connect(mapStateToProps)(Product));
