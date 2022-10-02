import "./App.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import { changeCategory, setCategories } from "./redux/categorySlice";
import { setInitialCartItems } from "./redux/cartSlice";
import { setInitialCount } from "./redux/counterSlice";

import { client, GET_CATEGORIES_QUERY, makeQuery } from "./utils/queries";
import withRouter from "./utils/router";

import Header from "./components/Header/Header";
import Minicart from "./components/Minicart";

class App extends Component {

  componentDidMount() {
    makeQuery(GET_CATEGORIES_QUERY, (res) => {
      const categories = res.data.categories.map((category) => category.name);
      this.props.setCategories(categories)

      if (this.props.router.location.pathname === "/") {
        this.props.changeCategory(res.data.categories[0].name);
        this.props.router.navigate(`/${res.data.categories[0].name}`);
      } else if (
        this.props.router.location.pathname !== "/cart" &&
        !categories.includes(this.props.router.params.category)
      ) {
        this.props.router.navigate("/not-found");
      }
    });

    localStorage.getItem("cart") && this.props.setInitialCartItems(JSON.parse(localStorage.getItem("cart")));
    localStorage.getItem("count") && this.props.setInitialCount(+localStorage.getItem("count"))
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
    localStorage.setItem("cart", JSON.stringify(this.props.cart))
    localStorage.setItem("count", this.props.count.toString())
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
  cart: state.cart.items,
  totalPrice: state.cart.totalPrice,
  count: state.cartCounter.count,
});

const mapDispatchToProps = { changeCategory, setCategories, setInitialCartItems, setInitialCount };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
