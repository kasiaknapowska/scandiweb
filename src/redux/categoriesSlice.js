import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    category: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});


export const { changeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;