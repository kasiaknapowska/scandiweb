import "./_CurrencySelect.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { changeCurrency, fetchCurrencies } from "../../redux/currencySlice";
import withCloseOnClickOutside from "../../utils/hoc/withCloseOnClickOutside";

class CurrencySelect extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  onChooseCurrency(e, currency) {
    this.props.changeCurrency(currency);
    this.props.setIsOpen({
      isOpen: false,
    });
  }


  render() {
    return (
      <div className="currency_select" ref={this.props.wrapperRef}>
        <div
          className="currency_select_header"
          onClick={() => this.props.setIsOpen()}
        >
          {" "}
          {this.props.currency}{" "}
          <div
            className={classNames("arrow", {
              arrow_down: !this.props.isOpen,
              arrow_up: this.props.isOpen,
            })}
          ></div>
        </div>
        {this.props.isOpen && (
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

export default withCloseOnClickOutside(connect(mapStateToProps, mapDispatchToProps)(CurrencySelect));