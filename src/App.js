import "./App.scss";
import { Component } from "react";
import {client, GET_CATEGORIES_QUERY} from "./utils/queries"

import { connect } from "react-redux";
import { addCount, substractCount } from "./redux/counterSlice";

import Products from "./components/Products/Products";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
  
    client
      .query({ query: GET_CATEGORIES_QUERY })
      .then((res) => this.setState({ categories: res.data.categories }));
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
        {this.state.categories.length > 0 &&
          this.state.categories.map((category, index) => (
            <p key={`${category}_${index}`}>{category.name}</p>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cartCounter.count
});

const mapDispatchToProps = { addCount, substractCount };

export default connect(mapStateToProps, mapDispatchToProps)(App);
