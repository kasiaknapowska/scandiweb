import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CURRENCIES_QUERY, query } from "../utils/queries";

const initialState = {
  isLoading: false,
  currencies: [],
  currency: "$",
  error: "",
  status: "init"
};

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async () => {

      // throw new Error("Fail to fetch currency");
      const response = await query(GET_CURRENCIES_QUERY);
      return response;
  }
);

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currencies = action.payload ? action.payload.currencies.map((currency) => {
        return { label: currency.label, symbol: currency.symbol };
      }) : [];
      state.currency = action.payload ? action.payload.currencies[0].symbol : "$";
      state.error = "";
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.isLoading = false;
      state.currencies = [];
      state.error = action.error.message;
    });
  },
});

export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;
