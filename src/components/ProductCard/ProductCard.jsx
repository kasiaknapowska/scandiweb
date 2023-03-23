import "./_ProductCard.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withRouter from "../../utils/hoc/withRouter";
import withBusinessLogic from "../../utils/hoc/withBusinessLogic";
import { getPrice } from "../../utils/functions";
import cart from "../../assets/white-cart.svg";

class ProductCard extends PureComponent {
  render() {
    const image = this.props.product.gallery[0];
    const inStock = this.props.product.inStock;
    const price = getPrice(this.props.product.prices, this.props.currency);

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
              onClick={(e) =>
                this.props.addItemWithDefaultAttributes(e, this.props.product)
              }
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

export default withRouter(
  withBusinessLogic(connect(mapStateToProps)(ProductCard))
);
