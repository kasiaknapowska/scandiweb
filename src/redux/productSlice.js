import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCT_DETAILS_QUERY, query } from "../utils/queries";

const initialState = {
  loading: false,
  product: null,
  error: "",
};

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    const response = await query(GET_PRODUCT_DETAILS_QUERY, { id: id });
    console.log(response.product);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.error = "";
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.error.message;
    });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
