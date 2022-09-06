import React, { Component } from "react";

import { client, GET_CURRENCIES_QUERY } from "../../utils/queries";

import "./_CurrencySelect.scss";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    client.query({ query: GET_CURRENCIES_QUERY }).then((res) => {
      this.setState({
        currencies: res.data.currencies.map((currency) => ({
          label: currency.label,
          symbol: currency.symbol,
        })),
      });
    });
  }

  componentDidUpdate() {
    console.log(this.state.currencies);
  }

  render() {
    return (
      <div className="currency_select">
        <div
          className="currency_select_header"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          {" "}
          $ {">"}
        </div>
        {this.state.isOpen && (
          <ul className="currency_select_list">
            {this.state.currencies.map((currency) => (
              <li className="currency_select_item" key={currency.label}>
                {currency.symbol} {currency.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default CurrencySelect;
