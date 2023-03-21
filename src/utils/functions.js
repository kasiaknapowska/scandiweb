import _ from "lodash";

export const getPrice = (pricesArray, currencyChosen) => {
  return pricesArray
    .filter((price) => price.currency.symbol === currencyChosen)[0]
    .amount.toFixed(2);
};

export const createcartItem = (
  id,
  name,
  brand,
  gallery,
  prices,
  attributes,
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

//cartSlice func

export const areItemsTheSame = (
  id1,
  attributesChosen1,
  id2,
  attributesChosen2
) => {
  return id1 === id2 && _.isEqual(attributesChosen1, attributesChosen2);
};

export const isItemInCart = (items, id, attributesChosen) => {
  return items.find(
    (prod) =>
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
  const newArray = items.map(
    (prod) =>
      areItemsTheSame(prod.id, prod.attributesChosen, id, attributesChosen)
        ? { ...prod, quantity: fn(prod.quantity) }
        : prod
  );
  return newArray;
};
export const filterItemsArray = (items, id, attributesChosen) => {
  return items.filter(
    (item) =>
      !_.isEqual(
        item.attributesChosen,
        attributesChosen
      ) || item.id !== id
  );
}
