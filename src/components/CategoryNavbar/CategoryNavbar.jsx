import "./_CategoryNavbar.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { changeCategory } from "../../redux/categorySlice";
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
    console.log("navbar mounted");

    try {
      client.query({ query: GET_CATEGORIES_QUERY }).then((res) => {
        this.setState({
          categories: res.data.categories.map((category) => category.name),
        });

        if (!this.props.router.params.category) {
          this.props.changeCategory(res.data.categories[0].name);
          this.props.router.navigate(`/${res.data.categories[0].name}`);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate() {
    console.log("navbar updated");
    // console.log(this.props.router.location.pathname)

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

  onChooseCategory(e, category) {
    this.props.changeCategory(category);
  }

  render() {
    console.log("navbar render");
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
  category: state.category.category,
});

const mapDispatchToProps = { changeCategory };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryNavbar)
);
