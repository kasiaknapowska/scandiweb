import "./_CurrencySelect.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { changeCurrency, fetchCurrencies } from "../../redux/currencySlice";

import { GET_CURRENCIES_QUERY, makeQuery } from "../../utils/queries";

class CurrencySelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrencies();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
            {this.props.currencies.map((currency) => (
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
  currencies: state.currency.currencies,
});

const mapDispatchToProps = { changeCurrency, fetchCurrencies };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
