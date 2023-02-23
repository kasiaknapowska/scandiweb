import "./_ProductCard.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { addToCart } from "../../redux/cartSlice";
import { addCount } from "../../redux/counterSlice";

import withRouter from "../../utils/router";

import cart from "../../assets/white-cart.svg";

class ProductCard extends PureComponent {
  addItemToCart(e, { id, name, brand, gallery, prices, attributes }) {
    e.stopPropagation();
    const item = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      attributesChosen: {},
    };
    if (attributes.length > 0) {
      console.log(attributes);
      attributes.forEach((attribute) => {
        item.attributesChosen = {
          ...item.attributesChosen,
          [attribute.id.toLowerCase().replaceAll(" ", "-")]:
            attribute.items[0].value,
        };
      });
    }
    console.log(item);
    this.props.addToCart(item);
    this.props.addCount();
    this.props.router.navigate(`${this.props.router.location.pathname}`);
  }

  render() {
    const image = this.props.product.gallery[0];
    const price = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    const inStock = this.props.product.inStock;

    return (
      <div
        className={classNames("product_card", { out_of_stock: !inStock })}
        onClick={() =>
          this.props.router.navigate(
            `${this.props.router.location.pathname}/${this.props.product.id}`
          )
        }
      >
        <div className="product_img_container">
          {!inStock && <p>out of stock</p>}
          {inStock && (
            <div
              className="circle"
              onClick={(e) => this.addItemToCart(e, this.props.product)}
            >
              <img src={cart} className="add_to_cart_icon" alt="add to cart" />
            </div>
          )}
          <img src={image} alt={this.props.product.name} />
        </div>
        <h2 className="product_name">
          {this.props.product.name} {this.props.product.brand}
        </h2>
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
const mapDispatchToProps = {
  addCount,
  addToCart,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCard)
);
