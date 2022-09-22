import React, { Component } from "react";
import { connect } from "react-redux";
import Attributes from "../Attributes";
import MinicartItem from "../MinicartItem";
import "./_Minicart.scss";

class Minicart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.cart);
    return (
      <div className="minicart_bg">
        <div className="minicart">
          <h1>
            My Bag, <span>{this.props.count} items</span>
          </h1>
          {this.props.count > 0 && (
            <>
              {this.props.cart.map((item, index) => (
                <MinicartItem key={item.id + index} item={item} />
              ))}
              <div className="total">
                <span>Total</span>
                <h1>$ ...</h1>
              </div>
              <div className="buttons_container">
                <button className="btn_secondary btn_minicart">view bag</button>
                <button className="btn_primary btn_minicart">check out</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  count: state.cartCounter.count,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(Minicart);
