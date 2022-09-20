import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categorySlice from "./categorySlice";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cartCounter: counterReducer,
    category: categorySlice,
    currency: currencySlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
