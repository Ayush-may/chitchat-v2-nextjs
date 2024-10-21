import { gql } from "@apollo/client";

// export const GET_USER_BY_USERNAME = gql`
//   mutation GetUserByUsername($username: String! ){
//     getUserByUsername( username: $username ){
//         username
//     }
//   }
// `

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!){
    createUser(username: $username , password: $password){
      user{
        username
        token
      }
    }
  }
`