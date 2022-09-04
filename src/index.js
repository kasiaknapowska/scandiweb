import React from "react";
import ReactDOM from "react-dom/client";
import Symbol_observable from 'symbol-observable';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

// import { ApolloProvider, ApolloConsumer } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApolloProvider client={client}> */}
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
      {/* </ApolloProvider> */}
    </Provider>
  </React.StrictMode>
);
