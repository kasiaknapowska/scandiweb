import "./_CartItem.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { substractFromCart, addToCart } from "../../redux/cartSlice";
import { addCount, substractCount } from "../../redux/counterSlice";

import Attributes from "../Attributes";
import SliderArrow from "../SliderArrow/SliderArrow";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  addItem(item) {
    this.props.addToCart(item);
    this.props.addCount();
  }
  substractItem(item) {
    this.props.substractFromCart(item);
    this.props.substractCount();
  }

  goToPrevious(gallery) {
    const isFirstSlide = this.state.currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? gallery.length - 1
      : this.state.currentImageIndex - 1;
    this.setState({ currentImageIndex: newIndex });
  }
  goToNext(gallery) {
    const isLastSlide = this.state.currentImageIndex === gallery.length - 1;
    const newIndex = isLastSlide ? 0 : this.state.currentImageIndex + 1;
    this.setState({ currentImageIndex: newIndex });
  }

  render() {
    return (
      <div
        className={classNames("cart_element", {
          minicart_item: this.props.type === "minicart",
          cart_item: this.props.type === "cart",
        })}
      >
        <div className="item_details">
          <h2>
            <span>{this.props.item.name}</span>
            <br></br>
            {this.props.item.brand}
          </h2>
          <p>
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
          </p>
          <div>
            {this.props.item.attributes.map((attribute, index) => {
              return (
                <div key={attribute.id + index}>
                  <h3>{attribute.name}</h3>
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
        <div className="item_quantity">
          <div onClick={() => this.addItem(this.props.item)}>+</div>
          <span>{this.props.item.quantity}</span>
          <div
            className="substract"
            onClick={() => this.substractItem(this.props.item)}
          >
            -
          </div>
        </div>
        {this.props.type === "minicart" && (
          <div
            className="item_img"
            style={{
              backgroundImage: `url(${this.props.item.gallery[0]})`,
              backgroundSize: "contain",
            }}
          ></div>
        )}
        {this.props.type === "cart" && (
          <div
            className="item_img"
            style={{
              backgroundImage: `url(${
                this.props.item.gallery[this.state.currentImageIndex]
              })`,
              backgroundSize: "contain",
            }}
          >
            {this.props.item.gallery.length > 1 && (
              <div className="arrows_container">
                {" "}
                <SliderArrow
                  direction="previous"
                  onClick={() => this.goToNext(this.props.item.gallery)}
                />
                <SliderArrow
                  direction="next"
                  onClick={() => this.goToPrevious(this.props.item.gallery)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

const mapDispatchToProps = {
  substractFromCart,
  addToCart,
  addCount,
  substractCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
