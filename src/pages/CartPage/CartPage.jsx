import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";
import "./_CartPage.scss";

class CartPage extends Component {


  render() {
    // console.log(this.props.count);
    // console.log(this.props.cart);
    const price = this.props.totalPrice.filter(
      (price) => price.currency.symbol === this.props.currency
    )[0].amount;
    return (
      <main className="container cart_page">
        <h1>Cart</h1>
        <div className="line"></div>
        {this.props.count > 0 && (
          <>
            {this.props.cart.map((item, index) => (
              <>
                <CartItem
                  key={item.id + index}
                  item={item}
                  type="cart"
                  // currentImageIndex={this.state.currentImageIndex}
                  // gotToNext={this.goToNext}
                  // gotToPrevious={this.goToPrevious}
                />
                <div className="line" key={"line" + index}></div>
              </>
            ))}
          </>
        )}
        <table>
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
        </table>
        <button className="btn_primary btn_order">Order</button>
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
