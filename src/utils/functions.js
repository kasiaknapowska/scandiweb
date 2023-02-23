export const getPrice = (pricesArray, currencyChosen) => {
  return pricesArray
    .filter((price) => price.currency.symbol === currencyChosen)[0]
    .amount.toFixed(2);
};
