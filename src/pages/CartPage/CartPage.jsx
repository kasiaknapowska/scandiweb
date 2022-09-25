import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";
import "./_CartPage.scss";

class CartPage extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    console.log(this.props.count);
    console.log(this.props.cart);
    return (
      <main className="container cart_page">
        <h1>Cart</h1>
        {this.props.count > 0 && (
          <>
            {this.props.cart.map((item, index) => (
              <CartItem key={item.id + index} item={item} type="cart"/>
            ))}
          </>
        )}
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
