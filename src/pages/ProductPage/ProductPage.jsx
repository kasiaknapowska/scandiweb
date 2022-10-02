import "./_ProductPage.scss";

import React, { Component } from "react";
import classNames from "classnames";

import withRouter from "../../utils/router";

import {
  client,
  GET_PRODUCT_DETAILS_QUERY,
  GET_PRODUCTS_QUERY,
  makeQuery,
} from "../../utils/queries";

import ProductDetails from "../../components/ProductDetails";


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
    makeQuery(GET_PRODUCTS_QUERY, (res) => {
      const productsAvailable = res.data.categories
        .map((category) => category.products.map((product) => product.id))
        .flat();
      if (productsAvailable.includes(this.props.router.params.productId)) {
        makeQuery(
          GET_PRODUCT_DETAILS_QUERY,
          (res) => {
            this.setState({
              loading: res.loading,
              product: res.data.product,
            });
          },
          { id: this.props.router.params.productId }
        );
      } else {
        this.props.router.navigate("/not-found");
      }
    });
  }
  componentWillUnmount() {
    client.stop();
  }

  render() {
    return (
      <main className="container product_page">
        {this.state.loading && <p>Loading...</p>}
        {this.state.product && (
          <div
            className={classNames("flex_container", {
              out_of_stock: !this.state.product.inStock,
            })}
          >
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
                      onClick={() =>
                        this.setState({ currentImageIndex: index })
                      }
                    ></div>
                  );
                })}
              </div>
              <img
                className="preview"
                src={this.state.product.gallery[this.state.currentImageIndex]}
              />
            </div>
            <ProductDetails product={this.state.product} />
          </div>
        )}
      </main>
    );
  }
}

export default withRouter(ProductPage);
