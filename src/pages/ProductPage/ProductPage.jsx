import "./_ProductPage.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import withRouter from "../../utils/hoc/withRouter";

import { fetchProductDetails, resetProduct } from "../../redux/productSlice";

import ProductDetails from "../../components/ProductDetails";
import LoadingSpinner from "../../components/LoadingSpinner";

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
    const isLoading = this.props.isLoading;
    const error = this.props.error;
    const product = this.props.product;

    return (
      <main className="container product_page page_container">
        {isLoading && <LoadingSpinner/>}
        {!isLoading && error ? <div className="error"><span>Error!</span>{error}</div> : null}
        {!isLoading && !error && product && (
          <div
            className={classNames("flex_container", {
              out_of_stock: !product.inStock,
            })}
          >
            <div className="images">
              <div className="preview_container">
                {product.gallery.map((url, index) => {
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
                src={product.gallery[this.state.currentImageIndex]}
              />
            </div>
            <ProductDetails product={product} />
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
