import "./App.scss";
import { Component } from "react";


import { connect } from "react-redux";
import { addCount, substractCount } from "./redux/counterSlice";

import Header from "./components/Header";
import { Outlet } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    
  }


  componentDidUpdate() {
    console.log(this.props.count)
  }

  render() {
    return (
      <div className="App">
          <Header/>
          <Outlet/>
        
        <button onClick={() => this.props.addCount()}>Add to cart</button>
        <button onClick={() => this.props.substractCount()}>Substract from cart</button>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count
});

const mapDispatchToProps = { addCount, substractCount };

export default connect(mapStateToProps, mapDispatchToProps)(App);
