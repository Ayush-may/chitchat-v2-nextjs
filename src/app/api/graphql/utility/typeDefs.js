import { gql } from "graphql-tag"

const typeDefs = gql`
  type Token{
    token : String
  }

  type User{
    _id: String
    username: String!
    password: String!
    created_at: String
    token: String
  }

  type Friend{
    _id: Int!
    userID: String!
  }

  type Response{
    success: Boolean!
    message: String!
  }

  type CreateUserPayload{
    user: User
    response: Response
  }

  type Query{
    getUsers:[User]
    getUserByUsername(username: String!) : User 
  }
  
  type Mutation{
    createUser(username:String!, password: String!): CreateUserPayload
  }
`;



export default typeDefs;