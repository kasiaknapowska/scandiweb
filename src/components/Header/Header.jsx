import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/empty-cart.png";

class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <header className="header">
        <div>WOMAN MAN KIDS</div>
        <Logo />
        <div>
          <div>
            $ <span> {">"}</span>
          </div>
          <img src={cart} />
        </div>
      </header>
    );
  }
}

export default Header;
