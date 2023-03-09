import "./App.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  changeCategory,
  // setCategories,
  fetchCategories,
} from "./redux/categorySlice";
import { setInitialCartItems } from "./redux/cartSlice";
import { setInitialCount } from "./redux/counterSlice";

import { client } from "./utils/queries";
import withRouter from "./utils/router";

import Header from "./components/Header/Header";
import Minicart from "./components/Minicart";

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories().then(() => {
      if (this.props.router.location.pathname === "/") {
        this.props.changeCategory(this.props.categories[0]);
        this.props.router.navigate(`/${this.props.categories[0]}`);
      } else if (
        this.props.router.location.pathname !== "/cart" &&
        !this.props.categories.includes(this.props.router.params.category)
      ) {
        this.props.router.navigate("/not-found");
      }
    });

    localStorage.getItem("cart") &&
      // this.props.setInitialCartItems(JSON.parse(localStorage.getItem("cart")));
      this.props.setInitialCartItems(+localStorage.getItem("cart"));
    localStorage.getItem("count") &&
      this.props.setInitialCount(+localStorage.getItem("count"));
  }

  componentDidUpdate(prevProps) {
    const paramsCategory = this.props.router.params.category;

    if (
      this.props.categories.includes(paramsCategory) &&
      this.props.category !== paramsCategory
    ) {
      this.props.changeCategory(paramsCategory);
    }
    if (prevProps.count !== this.props.count) {
      localStorage.setItem("cart", JSON.stringify(this.props.cart));
      localStorage.setItem("count", this.props.count.toString());
    }
  }

  componentWillUnmount() {
    client.stop();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Outlet />
        {this.props.minicart && <Minicart />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  minicart: state.minicart.isOpen,
  categories: state.category.categories,
  category: state.category.category,
  // cart: state.cart.items,
  // totalPrice: state.cart.totalPrice,
  count: state.cartCounter.count,
});

const mapDispatchToProps = {
  fetchCategories,
  changeCategory,
  // setCategories,
  setInitialCartItems,
  setInitialCount,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
