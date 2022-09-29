import React from "react";
import ReactDOM from "react-dom/client";
// import Symbol_observable from "symbol-observable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<CategoryPage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path=":category/:productId" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="not-found" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
