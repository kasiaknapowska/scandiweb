import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../utils/router";
import { setMinicartOpen } from "../../redux/minicartSlice";
import CartItem from "../CartItem";
import "./_Minicart.scss";

class Minicart extends Component {
  constructor(props) {
    super(props);
  }

  viewBag() {
    this.props.router.navigate("/cart");
    this.props.setMinicartOpen(false);
  }
  render() {
    // console.log(this.props.price);
    const price = this.props.totalPrice.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    return (
      <div className="minicart_bg">
        <div className="minicart">
          <h1>
            My Bag, <span>{this.props.count} items</span>
          </h1>
          {this.props.count > 0 && (
            <>
              {this.props.cart.map((item, index) => (
                <CartItem key={item.id + index} item={item} type="minicart"/>
              ))}
              <div className="total">
                <span>Total</span>
                <h1>
                  {price[0].currency.symbol}{" "}
                  <span style={{ width: "2px" }}></span>{" "}
                  {price[0].amount.toFixed(2)}
                </h1>
              </div>
              <div className="buttons_container">
                <button
                  className="btn_secondary btn_minicart"
                  onClick={() => this.viewBag()}
                >
                  view bag
                </button>
                <button className="btn_primary btn_minicart">check out</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  count: state.cartCounter.count,
  currency: state.currency.currency,
  totalPrice: state.cart.totalPrice,
});
const mapDispatchToProps = {
  setMinicartOpen,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Minicart)
);
