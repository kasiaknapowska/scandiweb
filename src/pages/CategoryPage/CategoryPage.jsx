import React, { Component } from "react";
import { connect } from "react-redux";
import {
  client,
  GET_PRODUCTS_BY_CATEGORY,
  makeQuery,
} from "../../utils/queries";

import "./_CategoryPage.scss";
import Products from "../../components/Products";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: null,
    };
    // this.getProducts =  this.getProducts.bind(this)
  }

  componentDidMount() {
    console.log("category page mounted");
  }

  componentDidUpdate(prevProps) {
    console.log("category page updated");
    console.log(prevProps.category, this.props.category);
    if (prevProps.category !== this.props.category) {
      this.getProductsByCategory(this.props.category);
    }
  }

  getProductsByCategory(category) {
    // try {
    //   client
    //     .query({
    //       query: GET_PRODUCTS_BY_CATEGORY,
    //       variables: { title: category },
    //     })
    //     .then((res) => {
    //       if (res.errors)
    //         console.error(res.errors.map((error) => error.message));

    //       this.setState({
    //         loading: res.loading,
    //         products: res.data.category.products.map((product) => product),
    //       });
    //     });
    // } catch (error) {
    //   console.error(error);
    // }

    makeQuery(
      GET_PRODUCTS_BY_CATEGORY,
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
        {this.state.loading && <p>Loading...</p>}
        {this.state.products && <Products products={this.state.products} />}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapStateToProps)(CategoryPage);
