import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
        if (Number.isNaN(action.payload)) return;
        const isItemInCart = state.items.find(
          (prod) => prod.id === action.payload.id
        );
        if (isItemInCart) {
          state.items = state.items.map((prod) =>
            prod.id === action.payload.id
              ? { ...prod, quantity: prod.quantity + 1 }
              : prod
          );
        } else {
          state.items = [...state.items, { ...action.payload, quantity: 1 }];
        }
      },
      substractFromCart: (state, action) => {
        if (Number.isNaN(action.payload)) return;
        if (action.payload.quantity > 1) {
          state.items = state.items.map((prod) =>
            prod.id === action.payload.id
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod
          );
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      },
      editAttributes: (state, action) => {
        state.items = state.items.map((prod) =>
            prod.id === action.payload.id
              ? { ...prod, attributes: action.payload.attributes }
              : prod
          );
      },
  },
});


export const { addtoCart, substractFromCart, editAttributes } = cartSlice.actions;
export default cartSlice.reducer;