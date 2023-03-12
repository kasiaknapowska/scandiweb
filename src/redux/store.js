import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categorySlice from "./categorySlice";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import minicartSlice from "./minicartSlice";
import productsSlice from "./productsSlice";
import productSlice from "./productSlice";


export const store = configureStore({
  reducer: {
    cartCounter: counterReducer,
    category: categorySlice,
    currency: currencySlice,
    cart: cartSlice,
    minicart: minicartSlice,
    products: productsSlice,
    product: productSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
