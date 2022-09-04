import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cartCounter",
  initialState: {
    count: 0,
  },
  reducers: {
    addCount: (state) => {
      state.count += 1;
    },
    substractCount: (state) => {
      if (state.count === 0) return;
      state.count -= 1;
    },
  },
});


export const { addCount, substractCount } = counterSlice.actions;
export default counterSlice.reducer;