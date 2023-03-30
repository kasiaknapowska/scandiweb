import "./_CartItem.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withBusinessLogic from "../../utils/hoc/withBusinessLogic";
import { getPrice } from "../../utils/functions";
import Attributes from "../Attributes";
import SliderArrow from "../SliderArrow/SliderArrow";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
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
    const price = getPrice(this.props.item.prices, this.props.currency);
    const item = this.props.item;
    return (
      <div
        className={classNames("cart_element", {
          minicart_item: this.props.type === "minicart",
          cart_item: this.props.type === "cart",
        })}
      >
        <div className="item_details">
          <h2>
            <span>{item.name}</span>
            <br></br>
            {item.brand}
          </h2>
          <p>
            {this.props.currency} <span style={{ width: "2px" }}></span>
            {price}
          </p>
          <div>
            {item.attributes.map((attribute, index) => {
              return (
                <div key={attribute.id + index}>
                  <h3>{attribute.name}</h3>
                  <Attributes
                    attribute={attribute}
                    attributesChosen={item.attributesChosen}
                    isClickable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="item_quantity">
          <div onClick={() => this.props.addItem(item)}>+</div>
          <span>{item.quantity}</span>
          <div
            className="substract"
            onClick={() => this.props.substractItem(item)}
          >
            -
          </div>
        </div>
        {this.props.type === "minicart" && (
          <div
            className="item_img"
            style={{
              backgroundImage: `url(${item.gallery[0]})`,
              backgroundSize: "contain",
            }}
          ></div>
        )}
        {this.props.type === "cart" && (
          <div
            className="item_img"
            style={{
              backgroundImage: `url(${
                item.gallery[this.state.currentImageIndex]
              })`,
              backgroundSize: "contain",
            }}
          >
            {item.gallery.length > 1 && (
              <div className="arrows_container">
                {" "}
                <SliderArrow
                  direction="previous"
                  onClick={() => this.goToNext(item.gallery)}
                />
                <SliderArrow
                  direction="next"
                  onClick={() => this.goToPrevious(item.gallery)}
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

export default withBusinessLogic(connect(mapStateToProps)(CartItem));
