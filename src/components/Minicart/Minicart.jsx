import "./_Minicart.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";

import withRouter from "../../utils/router";
import { getPrice } from "../../utils/functions";

import CartItem from "../CartItem";
import cart from "../../assets/grey-cart.svg";

class Minicart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  viewBag() {
    this.props.router.navigate("/cart");
    this.setState({
      isOpen: false,
    });
  }
  handleClickOutside(e) {
    if (
      this.state.isOpen &&
      this.wrapperRef &&
      !this.wrapperRef.current.contains(e.target)
    ) {
      this.setState({
        isOpen: false,
      });
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <>
        <div
          style={{ display: !this.state.isOpen && "none" }}
          className={this.state.isOpen ? "minicart_bg" : undefined}
        ></div>

        <div ref={this.wrapperRef}>
          <div
            className="cart"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            <img src={cart} className="cart_icon" alt="add to cart"/>
            {this.props.count > 0 && (
              <div className="cart_count">{this.props.count}</div>
            )}
          </div>
          {this.state.isOpen && (
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

export default withRouter(connect(mapStateToProps)(Minicart));
