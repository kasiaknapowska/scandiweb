import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { client, GET_CURRENCIES_QUERY, makeQuery } from "../../utils/queries";

import { changeCurrency } from "../../redux/currencySlice";

import "./_CurrencySelect.scss";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      isOpen: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // try {
    //   client.query({ query: GET_CURRENCIES_QUERY }).then((res) => {
    //     this.setState({
    //       currencies: res.data.currencies.map((currency) => ({
    //         label: currency.label,
    //         symbol: currency.symbol,
    //       })),
    //     });
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    makeQuery(GET_CURRENCIES_QUERY, (res) => {
      this.setState({
        currencies: res.data.currencies.map((currency) => ({
          label: currency.label,
          symbol: currency.symbol,
        })),
      });
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    client.stop();
  }

  onChooseCurrency(e, currency) {
    this.props.changeCurrency(currency);
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
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div className="currency_select" ref={this.wrapperRef}>
        <div
          className="currency_select_header"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          {" "}
          {this.props.currency}{" "}
          <div
            className={classNames("arrow", {
              arrow_down: !this.state.isOpen,
              arrow_up: this.state.isOpen,
            })}
          ></div>
        </div>
        {this.state.isOpen && (
          <ul className="currency_select_list">
            {this.state.currencies.map((currency) => (
              <li
                className={classNames("currency_select_item", {
                  is_active: currency.symbol === this.props.currency,
                })}
                key={currency.label}
                onClick={(e) => this.onChooseCurrency(e, currency.symbol)}
              >
                {currency.symbol} {currency.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
