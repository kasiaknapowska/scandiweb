import React, { Component } from "react";
import withRouter from "../../utils/router";
import {
  client,
  GET_PRODUCT_DETAILS_QUERY,
  makeQuery,
} from "../../utils/queries";
import ProductDetails from "../../components/ProductDetails";

import "./_ProductPage.scss";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: undefined,
      product: null,
      currentImageIndex: 0,
    };
  }

  componentDidMount() {
    makeQuery(
      GET_PRODUCT_DETAILS_QUERY,
      (res) => {
        // if (res.errors) console.error(res.errors.map((error) => error.message));

        this.setState({
          loading: res.loading,
          product: res.data.product,
        });
      },
      { id: this.props.router.params.productId }
    );
  }
  componentWillUnmount() {
    client.stop();
  }

  render() {
    console.log(this.props.router.params.productId);
    console.log(this.state.product);
    return (
      <main className="container product_page">
        {this.state.loading && <p>Loading...</p>}
        {this.state.product && (
          <div className="flex_container">
            <div className="images">
            <div className="preview_container">
              {this.state.product.gallery.map((url, index) => {
                return (
                  <div
                    key={index}
                    className="thumbnail"
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                    onClick={() => this.setState({ currentImageIndex: index })}
                  ></div>
                );
              })}
            </div>
            <img
              className="preview"
              src={this.state.product.gallery[this.state.currentImageIndex]}
            />
            </div>
            <ProductDetails product={this.state.product}/>
          </div>
        )}
      </main>
    );
  }
}

export default withRouter(ProductPage);
