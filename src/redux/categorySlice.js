import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CATEGORIES_QUERY, query } from "../utils/queries";

const initialState = {
  loading: false,
  categories: [],
  error: "",
  category: null,
};

export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const response = await query(GET_CATEGORIES_QUERY)
  return response.categories
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload.map(category => category.name)
      state.error = ''
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false
      state.categories = []
      state.error = action.error.message
    })
  }
});

// export const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     setCategories: (state, action) => {
//       state.categories = action.payload;
//     },
//     changeCategory: (state, action) => {
//       state.category = action.payload;
//     },
//   },
// });

export const { changeCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
