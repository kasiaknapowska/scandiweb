import "./_Header.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { setMinicartOpen } from "../../redux/minicartSlice";
import { changeCategory } from "../../redux/categorySlice";

import CategoryNavbar from "../CategoryNavbar";
import CurrencySelect from "../CurrencySelect";

import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/grey-cart.svg";

class Header extends PureComponent {
  render() {
    return (
      <header className="container">
        <CategoryNavbar />
        <NavLink
          onClick={() => this.props.changeCategory(this.props.categories[0])}
          to={`/${this.props.categories[0]}`}
          className="logo"
        >
          <Logo alt="logo" />
        </NavLink>
        <div className="header_icons">
          <CurrencySelect />
          <div
            className="cart"
            onClick={() =>
              this.props.setMinicartOpen(!this.props.minicart)
            }
          >
            <img src={cart} className="cart_icon" />
            {this.props.count > 0 && (
              <div className="cart_count">{this.props.count}</div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count,
  minicart: state.minicart.isOpen,
  categories: state.category.categories,
});

const mapDispatchToProps = {
  setMinicartOpen,
  changeCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
