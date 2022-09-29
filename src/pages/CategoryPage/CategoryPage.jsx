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
  }

  componentDidMount() {
    if (
      this.props.router.params.category &&
      this.props.categories.includes(this.props.router.params.category)
    ) {
      this.getProductsByCategory(this.props.router.params.category);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getProductsByCategory(this.props.category);
    }
  }

  getProductsByCategory(category) {
    makeQuery(
      GET_PRODUCTS_BY_CATEGORY_QUERY,
      (res) => {
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
    return (
      <main className="container category_page">
        <h1>{this.props.category}</h1>
        <div className="products">
          {this.state.loading && <p>Loading...</p>}
          {this.state.products &&
            this.state.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
  categories: state.category.categories,
  currency: state.currency.currency,
});

export default withRouter(connect(mapStateToProps)(CategoryPage));
