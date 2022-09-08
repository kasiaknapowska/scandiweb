import React, { Component } from "react";
import { connect } from "react-redux";
import { client, GET_PRODUCTS_BY_CATEGORY } from "../../utils/queries";

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
    // this.getProductsByCategory("all");
    console.log("category page mounted")
  }

  componentDidUpdate(prevProps) {

    console.log("category page updated")
    console.log(prevProps.category, this.props.category);
    if (prevProps.category !== this.props.category) {
      this.getProductsByCategory(this.props.category);
    }
  }

  getProductsByCategory(category) {
    try {
      client
        .query({
          query: GET_PRODUCTS_BY_CATEGORY,
          variables: { title: category },
        })
        .then((res) => {
          if (res.errors)
            console.error(res.errors.map((error) => error.message));

          this.setState({
            loading: res.loading,
            products: res.data.category.products.map((product) => product),
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    client.stop();
  }

  render() {
    console.log("category page render")
    console.log(this.state.products);
    
    return (
      <div className="container category_page">
        <h1>Category: {this.props.category}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapStateToProps)(CategoryPage);
