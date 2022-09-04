import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categoriesSlice from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    cartCounter: counterReducer,
    category: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
