import "./_CategoryNavbar.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { changeCategory } from "../../redux/categorySlice";

class CategoryNavbar extends PureComponent {

  render() {

    return (
      <nav className="category_navbar">
        {/* {this.props.loading && <p>Loading...</p>}
        {!this.props.loading && this.props.error ? <p>Error: {this.props.error.message}</p> : null} */}
        {!this.props.loading && this.props.categories.length > 0 &&
          this.props.categories.map((category, index) => (
            <NavLink
              className={classNames("nav_link", {
                is_active: category === this.props.category,
              })}
              key={`${category}_${index}`}
              onClick={() => this.props.changeCategory(category)}
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
  categories: state.category.categories,
  loading: state.category.loading,
  error: state.category.error,
});

const mapDispatchToProps = { changeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavbar);
