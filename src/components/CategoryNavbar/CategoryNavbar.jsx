import "./_CategoryNavbar.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { changeCategory } from "../../redux/categoriesSlice";
import { client, GET_CATEGORIES_QUERY } from "../../utils/queries";
import withRouter from "../../utils/router";

class CategoryNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    // this.onChooseCategory = this.onChooseCategory.bind(this);
  }

  componentDidMount() {
    client.query({ query: GET_CATEGORIES_QUERY }).then((res) => {
      this.setState({
        categories: res.data.categories.map((category) => category.name),
      });
      if (!this.props.router.params.category) {
        this.props.changeCategory(res.data.categories[0].name);
        this.props.router.navigate(`/${res.data.categories[0].name}`);
      }
    });
  }

  componentDidUpdate() {
    // console.log(this.props.category);
    // console.log(this.props.router.location.pathname)
    // console.log(this.props.router.params);
    // console.log(this.state.categories)
    const paramsCategory = this.props.router.params.category;

    if (
      this.state.categories.includes(paramsCategory) &&
      this.props.category !== paramsCategory
    ) {
      this.props.changeCategory(paramsCategory);
      console.log("updated");
    }
  }

  onChooseCategory(e, category) {
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
              onClick={(e) => this.onChooseCategory(e, category)}
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
  category: state.categories.category,
});

const mapDispatchToProps = { changeCategory };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryNavbar)
);
