import "./App.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import { changeCategory, setCategories } from "./redux/categorySlice";
import { client, GET_CATEGORIES_QUERY, makeQuery } from "./utils/queries";
import withRouter from "./utils/router";

import Header from "./components/Header/Header";
import Minicart from "./components/Minicart";

class App extends Component {
  constructor(props) {
    super(props);
  }

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
  }

  componentDidUpdate() {
    const paramsCategory = this.props.router.params.category;

    if (
      this.props.categories.includes(paramsCategory) &&
      this.props.category !== paramsCategory
    ) {
      this.props.changeCategory(paramsCategory);
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
});

const mapDispatchToProps = { changeCategory, setCategories };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
