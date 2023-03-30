import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

//apollo client setup
export const client = new ApolloClient({
  uri: "http://localhost:4000",
});

//query function
export const query = async (query, variables) => {
    // throw new Error("Fail to fetch data");
    const response = await client.query({ query: query, variables: variables, fetchPolicy: "no-cache", });
    return response.data;
};

//queries
export const GET_CATEGORIES_QUERY = gql`
 query {
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
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCTS_ID_QUERY = gql`
  query {
    categories {
      products {
        id
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