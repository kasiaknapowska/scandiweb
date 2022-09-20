import React, { Component } from "react";
import { connect } from "react-redux";
import {
  client,
  GET_PRODUCTS_BY_CATEGORY_QUERY,
  makeQuery,
} from "../../utils/queries";
import withRouter from "../../utils/router";

import "./_CategoryPage.scss";
import ProductCard from "../../components/ProductCard";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: undefined,
      products: null,
    };
    // this.getProducts =  this.getProducts.bind(this)
  }

  componentDidMount() {
    console.log("category page mounted");
    if (this.props.router.params.category) {
      this.getProductsByCategory(this.props.router.params.category);
    }
  }

  componentDidUpdate(prevProps) {
    console.log("category page updated");
    console.log(prevProps.category, this.props.category);
    if (prevProps.category !== this.props.category ) {
      this.getProductsByCategory(this.props.category);
    }
  }

  getProductsByCategory(category) {

    makeQuery(
      GET_PRODUCTS_BY_CATEGORY_QUERY,
      (res) => {
        // if (res.errors) console.error(res.errors.map((error) => error.message));

        this.setState({
          loading: res.loading,
          products: res.data.category.products.map((product) => product),
        });
      },
      { title: category }
    );
  }

  componentWillUnmount() {
    client.stop();
  }

  render() {
    console.log("category page render");
    console.log(this.state.products);
    
    return (
      <main className="container category_page">
        <h1>{this.props.category}</h1>
        <div className="products">
        {this.state.loading && <p>Loading...</p>}
        {this.state.products && this.state.products.map(product => <ProductCard key={product.id} product={product}/>)}
      </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
  currency: state.currency.currency,
});

export default withRouter(connect(mapStateToProps)(CategoryPage));
