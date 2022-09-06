import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});


export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;