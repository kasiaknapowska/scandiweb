import React, { Component } from "react";

import "./_Header.scss";
import { ReactComponent as Logo } from "../../assets/a-logo.svg";
import cart from "../../assets/empty-cart.png";

import CategoryNavbar from "../CategoryNavbar";

class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }

  

  render() {
    return (
      <header>
        <CategoryNavbar/>
        <Logo className="logo"/>
        <div className="header_icons">
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
