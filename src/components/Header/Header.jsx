import React, { Component } from "react";
import { connect } from "react-redux";

import { setMinicartOpen } from "../../redux/minicartSlice";

import CategoryNavbar from "../CategoryNavbar";
import CurrencySelect from "../CurrencySelect";

import "./_Header.scss";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/grey-cart.svg";

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
          <div className="cart" onClick={() => this.props.setMinicartOpen(this.props.minicart ? false : true)}>
          <img src={cart} className="cart_icon" />
          {this.props.count > 0 && <div className="cart_count">{this.props.count}</div>}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count,
  minicart: state.minicart.isOpen,
});

const mapDispatchToProps = {
  setMinicartOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
