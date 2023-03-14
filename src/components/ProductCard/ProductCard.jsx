import "./_ProductCard.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { addToCart } from "../../redux/cartSlice";
import { addCount } from "../../redux/counterSlice";

import withRouter from "../../utils/router";
import { getPrice } from "../../utils/functions"
import cart from "../../assets/white-cart.svg";

class ProductCard extends PureComponent {
  addItemToCart(e, { id, name, brand, gallery, prices, attributes }) {

console.log(id)

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
      console.log(attributes[0].items);
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
    
    const image = this.props.productInfo.gallery[0];
    const price = getPrice(this.props.productInfo.prices, this.props.currency)
    const inStock = this.props.productInfo.inStock;

 
    return (
      <div
        className={classNames("product_card", { out_of_stock: !inStock })}
        onClick={() =>
          this.props.router.navigate(
            `${this.props.router.location.pathname}/${this.props.productInfo.id}`
          )
        }
      >
        <div className="product_img_container">
          {!inStock && <p>out of stock</p>}
          {inStock && (
            <div
              className="circle"
              onClick={(e) => this.addItemToCart(e, this.props.productInfo)}
            >
              <img src={cart} className="add_to_cart_icon" alt="add to cart" />
            </div>
          )}
          <img src={image} alt={this.props.productInfo.name} />
        </div>
        <h2 className="product_name">
          {this.props.productInfo.name} {this.props.productInfo.brand}
        </h2>
        <p className="product_price">
          {this.props.currency} <span style={{ width: "2px" }}></span>
          {price}
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
