import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GET_PRODUCTS_BY_CATEGORY_QUERY,
  GET_PRODUCTS_ID_QUERY,
  query,
} from "../utils/queries";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
  isIdLoading: false,
  allProductsId: [],
  idError: "",
};

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (title) => {
    // throw new Error("An error occured when fetching products")
    const response = await query(GET_PRODUCTS_BY_CATEGORY_QUERY, {
      title: title,
    });
    return response;
  }
);

export const fetchAllProductsId = createAsyncThunk(
  "products/fetchAllProductsId",
  async () => {
    // throw new Error("An error occured when fetching product")
    const response = await query(GET_PRODUCTS_ID_QUERY);
    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //fetch products by category
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload ? action.payload.category?.products : [];
      state.error = "";
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });

    //fetch all products id
    builder.addCase(fetchAllProductsId.pending, (state) => {
      state.isIdLoading = true;
    });
    builder.addCase(fetchAllProductsId.fulfilled, (state, action) => {
      state.isIdLoading = false;
      state.allProductsId = action.payload ? action.payload.categories
        .map((category) => category.products.map((product) => product.id))
        .flat() : [];
      state.idError = "";
    });
    builder.addCase(fetchAllProductsId.rejected, (state, action) => {
      state.isIdLoading = false;
      state.allProductsId = [];
      state.idError = action.error.message;
    });
  },
});

export default productsSlice.reducer;
