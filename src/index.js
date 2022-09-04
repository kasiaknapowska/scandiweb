import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// import { ApolloProvider, ApolloConsumer } from "@apollo/client";
// import { Query } from "@apollo/client/react/components";
// import { gql } from "apollo-boost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApolloProvider client={client}> */}
      <App />

      {/* </ApolloProvider> */}
    </Provider>
  </React.StrictMode>
);
