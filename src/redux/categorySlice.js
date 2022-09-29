import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});


export const { changeCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;