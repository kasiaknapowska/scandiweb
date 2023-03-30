import "./_ProductPage.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import withRouter from "../../utils/hoc/withRouter";

import { fetchProductDetails, resetProduct } from "../../redux/productSlice";

import ProductDetails from "../../components/ProductDetails";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  componentDidMount() {
    this.props.fetchProductDetails(this.props.router.params.productId);
  }

  componentWillUnmount() {
    this.props.resetProduct();
  }
  render() {
    return (
      <main className="container product_page page_container">
        {this.props.isLoading && <p>Loading...</p>}
        {!this.props.isLoading && this.props.error ? <div className="error"><span>Error!</span>{this.props.error}</div> : null}
        {!this.props.isLoading && !this.props.error && this.props.product && (
          <div
            className={classNames("flex_container", {
              out_of_stock: !this.props.product.inStock,
            })}
          >
            <div className="images">
              <div className="preview_container">
                {this.props.product.gallery.map((url, index) => {
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
                alt="product thumbnail"
                src={this.props.product.gallery[this.state.currentImageIndex]}
              />
            </div>
            <ProductDetails product={this.props.product} />
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  isLoading: state.product.isLoading,
  error: state.product.error,
});
const mapDispatchToProps = {
  fetchProductDetails,
  resetProduct,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
