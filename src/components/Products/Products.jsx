import React, { Component } from "react";

import "./_Products.scss";
import ProductCard from "../ProductCard";


class Products extends Component {
  constructor(props) {
    super(props)
  }

  
  render() {
  console.log(this.props.products)
    return (
      <div className="products">
        {this.props.products.map(product => <ProductCard key={product.id} product={product}/>)}
      </div>
    );
  }
}

export default Products;
