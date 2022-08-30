import "./App.css";
import { Component } from "react";
import Products from "./components/Products/Products";
// import { ApolloProvider, ApolloConsumer } from "@apollo/client";
import { gql } from "apollo-boost";
import {client} from './index'

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    categories: []
  }
}

componentDidMount() {
  client.query({query: gql`
  {
    categories {
      name
    
      products {
        name
      }
    }
  }
  `}).then(res => this.setState({categories: res.data.categories}))
}

  render() {
    return (
      <div className="App">
        <h1>Scandiweb shop</h1>
        {/* <Products /> */}
        <h2>Categories</h2>
        {this.state.categories.map((category, index) => (
          <p key={`${category}_${index}`}>{category.name}</p>
        ))}
        {/* <ApolloConsumer>
          {(client) => {
            client
              .query({
                query: gql`
                  {
                    categories {
                      name
                      products {
                        name
                      }
                    }
                  }
                `,
              })
              .then((res) => console.log(this.state.categories)
                res.data.categories.map((category) => this.setState(prevState => {
                  return {
                    categories: [...prevState.categories, category]
                  }
                }))
              );
            return null;
          }}
        </ApolloConsumer> */}
      </div>
    );
  }
}

export default App;
