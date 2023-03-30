import "./App.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import { changeCategory, fetchCategories } from "./redux/categorySlice";
import { fetchCurrencies } from "./redux/currencySlice";
import { fetchAllProductsId } from "./redux/productsSlice";
import { setInitialCartItems } from "./redux/cartSlice";
import { setInitialCount } from "./redux/counterSlice";

import { client } from "./utils/queries";
import withRouter from "./utils/hoc/withRouter";

import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner";

class App extends Component {
  componentDidMount() {
    const pathname = this.props.router.location.pathname;
    const paramsCategory = this.props.router.params.category;
    const paramsProductId = this.props.router.params.productId;

    this.props.fetchCurrencies();
    this.props.fetchCategories().then(() => {
      if (pathname === "/") {
        this.props.router.navigate(`/${this.props.category}`);
      } else if (pathname === "/cart") {
        this.props.router.navigate("/cart");
      } else if (pathname.includes(`/${paramsCategory}/${paramsProductId}`)) {
        this.props.fetchAllProductsId().then(() => {
          if (
            this.props.category.includes(paramsCategory) &&
            this.props.allProductsId.includes(paramsProductId)
          ) {
            this.props.router.navigate(`/${paramsCategory}/${paramsProductId}`);
          } else {
            this.props.router.navigate("/not-found");
          }
        });
      } else if (
        this.props.category.includes(paramsCategory) &&
        pathname.endsWith(`/${paramsCategory}`)
      ) {
        this.props.router.navigate(`/${paramsCategory}`);
      } else {
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
    const isLoading = this.props.isLoading;
    const error = this.props.error;

    return (
      <div className="App">
        {isLoading && <LoadingSpinner />}
        {!isLoading && error && (
          <div className="error">
            <p>
              <span>Error!</span> {error}
            </p>
          </div>
        )}
        {!isLoading && !error &&
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
  allProductsId: state.products.allProductsId,
  count: state.cartCounter.count,
  cart: state.cart.items,
  error: state.category.error || state.currency.error || state.products.idError,
  isLoading:
    state.category.isLoading ||
    state.currency.isLoading ||
    state.products.isIdLoading,
});

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
  fetchAllProductsId,
  changeCategory,
  setInitialCartItems,
  setInitialCount,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
