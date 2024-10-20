import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos{
    getTodo{
        id
        task
      }
  }
`;