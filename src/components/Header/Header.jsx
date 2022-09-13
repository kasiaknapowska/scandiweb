import React, { Component } from "react";

import "./_Header.scss";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/grey-cart.svg";

import CategoryNavbar from "../CategoryNavbar";
import CurrencySelect from "../CurrencySelect";

class Header extends Component {
  render() {
    return (
      <header>
        <CategoryNavbar />
        <Logo className="logo" />
        <div className="header_icons">
          <CurrencySelect />
          <img src={cart} className="cart_icon" />
        </div>
      </header>
    );
  }
}

export default Header;
