import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "@apollo/client/react/hoc";
// import {GET_PRODUCTS_QUERY } from '../../index';


// console.log(GET_PRODUCTS_QUERY);

class Products extends Component {
  // constructor(props) {
  //   super(props)
  // }

  
  render() {
    // console.log(this.props);
    return (
      <div className="product_list">
        <h2>Products</h2>
      </div>
    );
  }
}

export default Products;
