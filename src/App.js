import "./App.scss";
import { Component } from "react";
import {client, GET_CATEGORIES_QUERY} from "./utils/queries"

import Products from "./components/Products/Products";
import Header from "./components/Header/Header";

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

  render() {
    return (
      <div className="App">
        <header>
          <Header/>
        </header>
        {/* <Products /> */}
        <h2>Categories</h2>
        {this.state.categories.length > 0 &&
          this.state.categories.map((category, index) => (
            <p key={`${category}_${index}`}>{category.name}</p>
          ))}
      </div>
    );
  }
}

export default App;
