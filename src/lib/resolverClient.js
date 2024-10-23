import { gql } from "@apollo/client";

// query
export const USERS_NAME_UID = gql`
  query UserNameUid {
    getUsers { 
      uid
      username
    }
  }
`

// mutation
export const LOGIN = gql`
  mutation Login($username: String!, $password : String!){
    login( username: $username , password : $password){
      user{
        uid
        username
        token
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!){
    createUser(username: $username , password: $password){
      user{
        uid
        username
        token
      }
    }
  }
`

export const ADD_FRIEND = gql`
  mutation AddFriend( $uid1 : String! , $uid2 : String! ){
    addFriend ( uid1 : $uid1 , uid2 : $uid2 ){
      response{
        message
        status
      }
    }
  }
`