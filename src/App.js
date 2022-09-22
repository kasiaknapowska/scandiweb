import "./App.scss";
import { Component } from "react";

import { connect } from "react-redux";
import { addCount, substractCount } from "./redux/counterSlice";

import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Minicart from "./components/Minicart";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Outlet />
        {this.props.minicart && <Minicart/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count,
  minicart: state.minicart.isOpen,
});

const mapDispatchToProps = { addCount, substractCount };

export default connect(mapStateToProps, mapDispatchToProps)(App);
