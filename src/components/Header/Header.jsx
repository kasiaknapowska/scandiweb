import React, { Component } from "react";
import { connect } from "react-redux";

import "./_Header.scss";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/grey-cart.svg";

import CategoryNavbar from "../CategoryNavbar";
import CurrencySelect from "../CurrencySelect";

class Header extends Component {
   constructor(props) {
    super(props)
  }
  render() {
    return (
      <header>
        <CategoryNavbar />
        <Logo className="logo" />
        <div className="header_icons">
          <CurrencySelect />
          <img src={cart} className="cart_icon" />
          {this.props.count > 0 && <div className="cart_count">{this.props.count}</div>}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count,
});

export default connect(mapStateToProps)(Header);
