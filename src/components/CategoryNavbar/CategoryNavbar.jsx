import React, { Component } from "react";

import {client, GET_CATEGORIES_QUERY} from "../../utils/queries"

import "./_CategoryNavbar.scss";

class CategoryNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
        categories: [],

      };

      // this.onChooseCategory = this.onChooseCategory.bind(this);
  }

  componentDidMount() {
  
    client
      .query({ query: GET_CATEGORIES_QUERY })
      .then((res) => this.setState({ categories: res.data.categories }));
  }

  onChooseCategory(e, category) {
    console.log(category);
    
    e.currentTarget.classList.toggle("is_active");
  }
  
  render() {
    // console.log(this.props);
    return (
      <div className="category_navbar">
        {this.state.categories.length > 0 &&
          this.state.categories.map((category, index) => (
            <span className="nav_link" key={`${category}_${index}`} onClick={(e) => this.onChooseCategory(e, category.name)}>{category.name}</span>
          ))}
      </div>
    );
  }
}

export default CategoryNavbar;
