import "./_CartPage.scss";
import "../../App.scss";

import React, { PureComponent  } from "react";
import { connect } from "react-redux";

import CartItem from "../../components/CartItem";
import { getPrice } from "../../utils/functions";

class CartPage extends PureComponent  {
  render() {
const currency = this.props.currency;
const count = this.props.count;
const cart = this.props.cart;

    if (this.props.totalPrice.length > 0 && count > 0) {
      const totalPrice = getPrice(this.props.totalPrice, currency)

      return (
        <main className="container cart_page page_container">
          <h1>Cart</h1>
          <div className="line"></div>
          <>
            {cart.map((item, index) => (
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
                    {currency}
                    &nbsp;
                    {(totalPrice * 0.21).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>Quantity:</th>
                  <td>{count}</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>
                    {currency}
                    &nbsp;
                      {totalPrice}
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
      <main className="container cart_page page_container">
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
