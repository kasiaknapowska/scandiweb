import "./App.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import { changeCategory, fetchCategories } from "./redux/categorySlice";
import { fetchCurrencies } from "./redux/currencySlice";
import { setInitialCartItems } from "./redux/cartSlice";
import { setInitialCount } from "./redux/counterSlice";

import { client } from "./utils/queries";
import withRouter from "./utils/hoc/withRouter";

import Header from "./components/Header/Header";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
    this.props.fetchCategories().then(() => {
      if (this.props.router.location.pathname === "/") {
        this.props.router.navigate(`/${this.props.category}`);
      } else if (
        this.props.router.location.pathname !== "/cart" &&
        !this.props.categories.includes(this.props.router.params.category)
      ) {
        this.props.router.navigate("/not-found");
      }
    });
    localStorage.getItem("cart") &&
      this.props.setInitialCartItems(JSON.parse(localStorage.getItem("cart")));

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
        {this.props.currencyLoading || this.props.categoryLoading ? (
          <div>Loading...</div>
        ) : null}
        {!this.props.currencyLoading &&
          !this.props.categoryLoading &&
          (this.props.categoryError || this.props.currencyError) && (
            <div className="error">
              <p><span>Error!</span> {this.props.categoryError || this.props.currencyError}</p>
            </div>
          )}
        {!this.props.currencyLoading &&
          !this.props.categoryLoading &&
          !this.props.categoryError &&
          !this.props.currencyError &&
          this.props.categories &&
          this.props.currencies && (
            <>
              <Header />
              <Outlet />
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  category: state.category.category,
  currencies: state.currency.currencies,
  count: state.cartCounter.count,
  cart: state.cart.items,
  categoryLoading: state.category.isLoading,
  categoryError: state.category.error,
  currencyLoading: state.currency.isLoading,
  currencyError: state.currency.error,
});

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
  changeCategory,
  setInitialCartItems,
  setInitialCount,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
