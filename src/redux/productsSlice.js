import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GET_PRODUCTS_BY_CATEGORY_QUERY,
  GET_PRODUCTS_ID_QUERY,
  query,
} from "../utils/queries";

const initialState = {
  loading: false,
  products: [],
  error: "",
  idLoading: false,
  allProductsId: [],
  idError: "",
};

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (title) => {
    const response = await query(GET_PRODUCTS_BY_CATEGORY_QUERY, {
      title: title,
    });
    // console.log(response.category.products)
    return response;
  }
);

export const fetchAllProductsId = createAsyncThunk(
  "products/fetchAllProductsId",
  async () => {
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
      state.loading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.category.products;
      state.error = "";
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });


//fetch all products id
    builder.addCase(fetchAllProductsId.pending, (state) => {
      state.idLoading = true;
    });
    builder.addCase(fetchAllProductsId.fulfilled, (state, action) => {
      state.idLoading = false;
      state.allProductsId = action.payload.categories
        .map((category) => category.products.map((product) => product.id))
        .flat();
      state.idError = "";
    });
    builder.addCase(fetchAllProductsId.rejected, (state, action) => {
      state.idLoading = false;
      state.allProductsId = [];
      state.idError = action.error.message;
    });
  },
});

export default productsSlice.reducer;
