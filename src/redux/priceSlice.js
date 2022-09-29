//Another way for total price calculation
//I chose the method based on cart items prices calculation -> see cartSlice setTotalPrice reducer


// import { createSlice } from "@reduxjs/toolkit";

// export const priceSlice = createSlice({
//   name: "price",
//   initialState: {
//     totalPrice: [],
//   },
//   reducers: {
//     sumPrice: (state, action) => {
//     if (state.totalPrice.length === 0) {
//         state.totalPrice = action.payload.prices
//     } else {
//         state.totalPrice = state.totalPrice.map(price => {
//             const filteredPrice = action.payload.prices.filter(el => {
//                 return el.currency.symbol === price.currency.symbol
//             });
//                 return ({...price, amount: price.amount + filteredPrice[0].amount})
            
//        })
//     }
     
//     },
//     substractPrice: (state, action) => {
//          ... //not finished yet
//     },
//   },
// });

// export const { sumPrice, substractPrice } =
//   priceSlice.actions;
// export default priceSlice.reducer;