import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: [],
  },
  reducers: {
    addToCart: (state, action) => {
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

      cartSlice.caseReducers.setTotalPrice(state);
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

      cartSlice.caseReducers.setTotalPrice(state);
    },
    setInitialCartItems: (state, action) => {
      state.items = action.payload;
      cartSlice.caseReducers.setTotalPrice(state);
    },
    setTotalPrice: (state) => {
      if (!state.items) return
      if (state.items.length > 0) {
        const pricesMultipliedByQuantity = state.items.map((item) => {
          return item.prices.map((price) => ({
            currency: { symbol: price.currency.symbol },
            amount: price.amount * item.quantity,
          }));
        });

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
      }
    },
  },
});

export const { addToCart, substractFromCart, setInitialCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
