import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // if (Number.isNaN(action.payload)) return;

      const isItemInCart = state.items.find(
        (prod) =>
          prod.id === action.payload.id &&
          _.isEqual(prod.attributesChosen, action.payload.attributesChosen)
      );
      if (isItemInCart) {
        state.items = state.items.map((prod) =>
          prod.id === action.payload.id &&
          _.isEqual(prod.attributesChosen, action.payload.attributesChosen)
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
    },
    substractFromCart: (state, action) => {
      if (action.payload.quantity > 1) {
        state.items = state.items.map((prod) =>
          prod.id === action.payload.id &&
          _.isEqual(prod.attributesChosen, action.payload.attributesChosen)
            ? { ...prod, quantity: prod.quantity - 1 }
            : prod
        );
      } else {
        state.items = state.items.filter(
          (item) =>
            !_.isEqual(
              item.attributesChosen,
              action.payload.attributesChosen
            ) || item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addToCart, substractFromCart } = cartSlice.actions;
export default cartSlice.reducer;
