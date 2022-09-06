import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categoriesSlice from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    cartCounter: counterReducer,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
