import { createSlice } from "@reduxjs/toolkit";
import {
  isItemInCart,
  createItemsArray,
  add,
  substract,
  filterItemsArray,
} from "../utils/functions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const isInCart = isItemInCart(
        state.items,
        action.payload.id,
        action.payload.attributesChosen
      );

      if (isInCart) {
        state.items = createItemsArray(
          state.items,
          action.payload.id,
          action.payload.attributesChosen,
          add
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }

      cartSlice.caseReducers.setTotalPrice(state);
    },
    substractFromCart: (state, action) => {
      if (action.payload.quantity > 1) {
        state.items = createItemsArray(
          state.items,
          action.payload.id,
          action.payload.attributesChosen,
          substract
        );
      } else {
        state.items = filterItemsArray(
          state.items,
          action.payload.id,
          action.payload.attributesChosen
        );
      }

      cartSlice.caseReducers.setTotalPrice(state);
    },
    setInitialCartItems: (state, action) => {
      state.items = action.payload;
      cartSlice.caseReducers.setTotalPrice(state);
    },
    setTotalPrice: (state) => {
      if (state.items.length === 0) return;
      if (state.items.length) {
        const pricesMultipliedByQuantity = state.items.map((item) => {
          return item.prices.map((price) => ({
            currency: { symbol: price.currency.symbol },
            amount: price.amount * item.quantity,
          }));
        });
// state.totalPrice = pricesMultipliedByQuantity[0]
        const currencySymbols = pricesMultipliedByQuantity[0].map(
          (el) => el.currency.symbol
        );
        const filtered = currencySymbols.map((symbol) =>
          pricesMultipliedByQuantity
            .flat()
            .filter((el) => el.currency.symbol === symbol)
        );

        state.totalPrice = filtered.map((el) =>
          el.reduce((total, item) => ({
            currency: el[0].currency,
            amount: total.amount + item.amount,
          }))
        );

      console.log(state.items)
      console.log(pricesMultipliedByQuantity)
      console.log(currencySymbols)
      console.log(filtered)
      console.log(state.totalPrice)
      }
      
    },
  },
});

export const { addToCart, substractFromCart, setInitialCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
