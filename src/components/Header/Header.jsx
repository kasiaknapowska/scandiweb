import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/empty-cart.png";

class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className="header">
        <div>WOMAN MAN KIDS</div>
        <Logo />
        <div>
          <div>
            $ <span> {">"}</span>
          </div>
          <img src={cart} />
        </div>
      </div>
    );
  }
}

export default Header;
