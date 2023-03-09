import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CURRENCIES_QUERY, query } from "../utils/queries";

const initialState = {
  loading: false,
  currencies: [],
  currency: "$",
  error: "",
};
export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async () => {
    const response = await query(GET_CURRENCIES_QUERY);
    console.log(response.currencies);
    return response.currencies;
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
      state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.loading = false;
      state.currencies = action.payload.map((currency) => {
        return { label: currency.label, symbol: currency.symbol };
      });
      state.currency = action.payload[0].symbol;
      state.error = "";
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.currencies = [];
      state.error = action.error.message;
    });
  },
});

export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;
