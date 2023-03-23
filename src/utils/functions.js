import _ from "lodash";

export const getPrice = (pricesArray, currencyChosen) => {
  return pricesArray
    .filter((price) => price.currency.symbol === currencyChosen)[0]
    .amount.toFixed(2);
};

export const createCartItem = (
{ id,
  name,
  brand,
  gallery,
  prices,
  attributes},
  attributesChosen = {}
) => {
  const item = {
    id,
    name,
    brand,
    gallery,
    prices,
    attributes,
    attributesChosen,
  };
  return item;
};

//cartSlice FUNC

//add & substract item
export const areItemsTheSame = (
  id1,
  attributesChosen1,
  id2,
  attributesChosen2
) => {
  return id1 === id2 && _.isEqual(attributesChosen1, attributesChosen2);
};

export const isItemInCart = (items, id, attributesChosen) => {
  return items.find((prod) =>
    areItemsTheSame(prod.id, prod.attributesChosen, id, attributesChosen)
  );
};
export const add = (n) => {
  return n + 1;
};
export const substract = (n) => {
  return n - 1;
};
export const createItemsArray = (items, id, attributesChosen, fn) => {
  const newArray = items.map((prod) =>
    areItemsTheSame(prod.id, prod.attributesChosen, id, attributesChosen)
      ? { ...prod, quantity: fn(prod.quantity) }
      : prod
  );
  return newArray;
};
export const filterItemsArray = (items, id, attributesChosen) => {
  return items.filter(
    (item) =>
      !_.isEqual(item.attributesChosen, attributesChosen) || item.id !== id
  );
};

//total price calculation

export const createCartPricesMultipliedByQuantityArr = (items) => {
 return items.map((item) => {
    return item.prices.map((price) => ({
      currency: { symbol: price.currency.symbol },
      amount: price.amount * item.quantity,
    }));
  });
};

export const getCurrencySymbols = (arr) => {
 return arr.map((el) => el.currency.symbol);
};

export const filterCartPricesArrBySymbols = (pricesMultipliedByQuantity, currencySymbols) => {
return currencySymbols.map((symbol) =>
pricesMultipliedByQuantity
  .flat()
  .filter((el) => el.currency.symbol === symbol)
);
}

export const setPrices = (filteredBySymbols) => {
 return filteredBySymbols.map((el) =>
          el.reduce((total, item) => ({
            currency: el[0].currency,
            amount: total.amount + item.amount,
          }))
        );
}