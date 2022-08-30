import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloConsumer } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { gql } from "apollo-boost";

//apollo client setup
export const client = new ApolloClient({
  uri: "http://localhost:4000",
});


const GET_CATEGORIES_QUERY = gql`
{
  categories {
    name
  }
}
`

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />

      {/* <ApolloConsumer>
        {client => {
          client.query({query: gql`
          {
            categories {
              name
              products {
                name
              }
            }
          }
          `}).then(res => console.log(res))
          return null
        }}
      </ApolloConsumer> */}
    </ApolloProvider>
  </React.StrictMode>
);
