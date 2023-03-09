import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categorySlice from "./categorySlice";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import minicartSlice from "./minicartSlice";
import productsSlice from "./productsSlice";


export const store = configureStore({
  reducer: {
    cartCounter: counterReducer,
    category: categorySlice,
    currency: currencySlice,
    cart: cartSlice,
    minicart: minicartSlice,
    products: productsSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
