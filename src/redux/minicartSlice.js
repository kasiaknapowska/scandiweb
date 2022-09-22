import { createSlice } from "@reduxjs/toolkit";

export const minicartSlice = createSlice({
  name: "minicart",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setMinicartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});


export const { setMinicartOpen } = minicartSlice.actions;
export default minicartSlice.reducer;