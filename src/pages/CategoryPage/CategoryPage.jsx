import "./_CategoryPage.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import withRouter from "../../utils/router";

import { fetchProductsByCategory } from "../../redux/productsSlice";

import ProductCard from "../../components/ProductCard";

class CategoryPage extends PureComponent {

  componentDidMount() {
    this.props.fetchProductsByCategory(
      this.props.router.params.category || this.props.category
    );
    // console.log(this.props.products)
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.category !== this.props.category) {
      this.props.fetchProductsByCategory(
        this.props.router.params.category || this.props.category
      );
    // }
  }



  render() {
    return (
      <main className="container category_page page_container">
        <h1>{this.props.category}</h1>
        <div className="products">
          {/* {this.state.loading && <p>Loading...</p>} */}
          {this.props.products &&
            this.props.products.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  category: state.category.category,
  categories: state.category.categories,
  currency: state.currency.currency,
});
const mapDispatchToProps = {
  fetchProductsByCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
