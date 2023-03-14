import "./_Header.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeCategory } from "../../redux/categorySlice";

import CategoryNavbar from "../CategoryNavbar";
import CurrencySelect from "../CurrencySelect";
import Minicart from "../Minicart";

import { ReactComponent as Logo } from "../../assets/a-logo.svg";

class Header extends PureComponent {
  render() {
    return (
      <header>
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
          <Minicart />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count,
  categories: state.category.categories,
});

const mapDispatchToProps = {
  changeCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
