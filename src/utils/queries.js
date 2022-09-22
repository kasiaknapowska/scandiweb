import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

//apollo client setup
export const client = new ApolloClient({
  uri: "http://localhost:4000",
});

//query function

export const makeQuery = (query, successcallback, variables) => {
  try {
    client.query({ query: query, variables: variables }).then((res) => {
      if (res.errors) console.error(res.errors.map((error) => error.message));
      successcallback(res);
    });
  } catch (error) {
    console.error(error);
  }
};

//queries
export const GET_CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query GetProductsByCategory($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS_QUERY = gql`
  query GetProductDetails($id: String!) {
    product(id: $id) {
      id
      name
      brand
      description
      gallery
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      inStock
      category
    }
  }
`;
