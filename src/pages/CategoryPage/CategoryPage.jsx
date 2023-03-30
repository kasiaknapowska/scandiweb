import "./_CategoryPage.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import withRouter from "../../utils/hoc/withRouter";

import { fetchProductsByCategory } from "../../redux/productsSlice";

import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

class CategoryPage extends PureComponent {
  componentDidMount() {
    this.props.fetchProductsByCategory(
      this.props.router.params.category || this.props.category
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.fetchProductsByCategory(
        this.props.router.params.category || this.props.category
      );
    }
  }

  render() {
    const isLoading = this.props.isLoading;
    const error = this.props.error;
    const products = this.props.products;
    return (
      <main className="container category_page page_container">
        <h1>{this.props.category}</h1>
        {isLoading && <LoadingSpinner />}
        {!isLoading && error ? (
          <div className="error">
            <span>Error!</span>
            {error}
          </div>
        ) : null}
        <div className="products">
          {!isLoading &&
            !error &&
            products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
  error: state.products.error,
  category: state.category.category,
  categories: state.category.categories,
});
const mapDispatchToProps = {
  fetchProductsByCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
