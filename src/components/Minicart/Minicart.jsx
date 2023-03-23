import "./_Minicart.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import withRouter from "../../utils/hoc/withRouter";
import { getPrice } from "../../utils/functions";

import CartItem from "../CartItem";
import cart from "../../assets/grey-cart.svg";
import withCloseOnClickOutside from "../../utils/hoc/withCloseOnClickOutside";

class Minicart extends PureComponent {

  viewBag() {
    this.props.router.navigate("/cart");
    this.props.setIsOpen({
      isOpen: false,
    });
  }

  render() {
    return (
      <>
        <div
          style={{ display: !this.props.isOpen && "none" }}
          className={this.props.isOpen ? "minicart_bg" : undefined}
        ></div>

        <div className="minicart_select" ref={this.props.wrapperRef}>
          <div
            className="cart"
            onClick={() => this.props.setIsOpen()}
          >
            <img src={cart} className="cart_icon" alt="add to cart"/>
            {this.props.count > 0 && (
              <div className="cart_count">{this.props.count}</div>
            )}
          </div>
          {this.props.isOpen && (
            <div className="minicart">
              <h1>
                My Bag, <span>{this.props.count} items</span>
              </h1>
              {this.props.count > 0 && (
                <>
                  <div className="minicart_items_container">
                    {this.props.cart.map((item, index) => (
                      <CartItem
                        key={item.id + index}
                        item={item}
                        type="minicart"
                      />
                    ))}
                  </div>
                  <div className="minicart_summary">
                    <div className="total">
                      <span>Total</span>
                      <h1>
                        {this.props.currency}{" "}
                        <span style={{ width: "2px" }}></span>{" "}
                        {getPrice(this.props.totalPrice, this.props.currency)}
                      </h1>
                    </div>
                    <div className="buttons_container">
                      <button
                        className="btn_secondary btn_minicart"
                        onClick={() => this.viewBag()}
                      >
                        view bag
                      </button>
                      <button className="btn_primary btn_minicart">
                        check out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  count: state.cartCounter.count,
  currency: state.currency.currency,
  totalPrice: state.cart.totalPrice,
});

export default withCloseOnClickOutside(withRouter(connect(mapStateToProps)(Minicart))) ;