import "./_ProductPage.scss";

import React, { PureComponent  } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import withRouter from "../../utils/router";

import { fetchProductDetails } from "../../redux/productSlice";
import { fetchAllProductsId } from "../../redux/productsSlice";

import ProductDetails from "../../components/ProductDetails";


class ProductPage extends PureComponent  {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  componentDidMount() {
    this.props.fetchAllProductsId().then(() => {
      if(this.props.allProductsId.includes(this.props.router.params.productId)) {
        this.props.fetchProductDetails(this.props.router.params.productId)
      } else {
        this.props.router.navigate("/not-found");
      }
    });
  }
  // componentDidUpdate() {
 
  //       this.props.fetchProductDetails(this.props.router.params.productId)
    
   
  // }

  render() {
    return (
      <main className="container product_page page_container">
        {/* {this.state.loading && <p>Loading...</p>} */}
        {this.props.product && (
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
  allProductsId: state.products.allProductsId,
});
const mapDispatchToProps = {
  fetchProductDetails,
  fetchAllProductsId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
