import React, { Component } from "react";

import "./_Products.scss";
import Product from "../Product";


class Products extends Component {
  constructor(props) {
    super(props)
  }

  
  render() {
  console.log(this.props.products)
    return (
      <div className="products">
        {this.props.products.map(product => <Product key={product.id} product={product}/>)}
      </div>
    );
  }
}

export default Products;
