import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

//apollo client setup
export const client = new ApolloClient({
    uri: "http://localhost:4000",
  });

export const GET_CATEGORIES_QUERY = gql`
{
  categories {
    name
  }
}
`

export const GET_CURRENCIES_QUERY = gql`
{
  currencies {
    label
    symbol
  }
}
`