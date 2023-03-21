import { createSlice } from "@reduxjs/toolkit";
import {
  isItemInCart,
  createItemsArray,
  add,
  substract,
  filterItemsArray,
  createCartPricesMultipliedByQuantityArr,
  getCurrencySymbols,
  filterCartPricesArrBySymbols,
  setPrices,
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
        const pricesMultipliedByQuantity =
          createCartPricesMultipliedByQuantityArr(state.items);
        const currencySymbols = getCurrencySymbols(
          pricesMultipliedByQuantity[0]
        );
        const filtered = filterCartPricesArrBySymbols(
          pricesMultipliedByQuantity,
          currencySymbols
        );
        state.totalPrice = setPrices(filtered);
      }
    },
  },
});

export const { addToCart, substractFromCart, setInitialCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
