import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCTS_BY_CATEGORY_QUERY, query } from "../utils/queries";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (title) => {
  const response = await query(GET_PRODUCTS_BY_CATEGORY_QUERY, {title: title})
//   console.log(response.category.products)
  return response.category.products
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
      state.error = ''
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message
    })
  }
});


export default productsSlice.reducer;
