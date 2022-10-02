import "./_CartPage.scss";

import React, { Component } from "react";
import { connect } from "react-redux";

import CartItem from "../../components/CartItem";


class CartPage extends Component {
  render() {
    if (this.props.totalPrice.length > 0 && this.props.count > 0) {
      const price = this.props.totalPrice.filter(
        (price) => price.currency.symbol === this.props.currency
      )[0].amount;

      return (
        <main className="container cart_page">
          <h1>Cart</h1>
          <div className="line"></div>
          <>
            {this.props.cart.map((item, index) => (
              <div key={item.id + index}>
                <CartItem item={item} type="cart" />
                <div className="line"></div>
              </div>
            ))}

            <table>
              <tbody>
                <tr>
                  <th>Tax 21%:</th>
                  <td>
                    {this.props.currency}
                    &nbsp;
                    {(price * 0.21).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>Quantity:</th>
                  <td>{this.props.count}</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>
                    {this.props.currency}
                    &nbsp;
                    {this.props.totalPrice
                      .filter(
                        (price) => price.currency.symbol === this.props.currency
                      )[0]
                      .amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn_primary btn_order">Order</button>
          </>
        </main>
      );
    }

    return (
      <main className="container cart_page">
        <h1>Cart</h1>
        <p>Your cart is empty</p>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  count: state.cartCounter.count,
  currency: state.currency.currency,
  totalPrice: state.cart.totalPrice,
});

export default connect(mapStateToProps)(CartPage);
