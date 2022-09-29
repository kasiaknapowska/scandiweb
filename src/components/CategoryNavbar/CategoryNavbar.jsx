import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { changeCategory } from "../../redux/categorySlice";
import { client, GET_CATEGORIES_QUERY, makeQuery } from "../../utils/queries";
import withRouter from "../../utils/router";

import "./_CategoryNavbar.scss";

class CategoryNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    makeQuery(GET_CATEGORIES_QUERY, (res) => {
      const categories = res.data.categories.map((category) => category.name);
      this.setState({
        categories,
      });

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
      this.state.categories.includes(paramsCategory) &&
      this.props.category !== paramsCategory
    ) {
      this.props.changeCategory(paramsCategory);
    }
  }

  componentWillUnmount() {
    client.stop();
  }

  onChooseCategory(category) {
    this.props.changeCategory(category);
  }

  render() {
    return (
      <nav className="category_navbar">
        {this.state.categories.length > 0 &&
          this.state.categories.map((category, index) => (
            <NavLink
              className={classNames("nav_link", {
                is_active: category === this.props.category,
              })}
              key={`${category}_${index}`}
              onClick={() => this.onChooseCategory(category)}
              to={`/${category}`}
            >
              {category}
            </NavLink>
          ))}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
});

const mapDispatchToProps = { changeCategory };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryNavbar)
);
