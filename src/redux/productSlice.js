import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCT_DETAILS_QUERY, query } from "../utils/queries";

const initialState = {
  isLoading: false,
  product: null,
  error: "",
};

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    // throw new Error("Fail to fetch product details");
    const response = await query(GET_PRODUCT_DETAILS_QUERY, { id: id });
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
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
      state.error = "";
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.product = null;
      state.error = action.error.message;
    });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
