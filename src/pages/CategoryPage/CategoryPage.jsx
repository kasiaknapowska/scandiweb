import "./_CategoryPage.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import withRouter from "../../utils/hoc/withRouter";

import { fetchProductsByCategory } from "../../redux/productsSlice";

import ProductCard from "../../components/ProductCard";

class CategoryPage extends PureComponent {

  componentDidMount() {
    if (this.props.categories.includes(this.props.router.params.category)) {
      this.props.fetchProductsByCategory(
        this.props.router.params.category || this.props.category
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.fetchProductsByCategory(
        this.props.router.params.category || this.props.category
      );
    }
  }



  render() {
    return (
      <main className="container category_page page_container">
        <h1>{this.props.category}</h1>
          {this.props.isLoading && <div>Loading...</div>}
          {!this.props.isLoading && this.props.error ? <div className="error"><span>Error!</span>{this.props.error}</div> : null}
        <div className="products">
          {!this.props.isLoading && !this.props.error && this.props.products &&
            this.props.products.map((product) => (
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
