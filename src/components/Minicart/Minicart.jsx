import React, { Component } from "react";
import { connect } from "react-redux";
import Attributes from "../Attributes";
import "./_Minicart.scss";

class Minicart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.items);
    // const price = this.props.items.prices.filter(
    //   (price) => price.currency.symbol === this.props.currency
    // );
    return (
      <div className="minicart_bg">
        <div className="minicart">
          <h1>
            My Bag, <span>{this.props.count} items</span>
          </h1>
          {this.props.count > 0 && (
            <>
              {this.props.cart.map((item, index) => (
                <div key={item.id + index}>
                  <h2>
                    {item.name}
                    <br></br>
                    {item.brand}
                  </h2>
                  <h3>
                    {
                      item.prices.filter(
                        (price) => price.currency.symbol === this.props.currency
                      )[0].currency.symbol
                    }{" "}
                    <span style={{ width: "2px" }}></span>
                    {item.prices
                      .filter(
                        (price) => price.currency.symbol === this.props.currency
                      )[0]
                      .amount.toFixed(2)}
                  </h3>
                  <div>{item.attributes.map(attribute => {
                    return (
                        <div key={attribute.id + index}>
                          <p>{attribute.name}</p>
                          <Attributes
                            attribute={attribute}
                            attributesChosen={item.attributesChosen}
                            onClick={false}
                          />
                        </div>
                      );
                  })}</div>
                </div>
              ))}
            </>
          )}
          <div>
            <span>Total</span>
            <h1>$ ...</h1>
          </div>
          <div className="buttons_container"><button className="btn_secondary btn_minicart">view bag</button><button className="btn_primary btn_minicart">check out</button></div>
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
