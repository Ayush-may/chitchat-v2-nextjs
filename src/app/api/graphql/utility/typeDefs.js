// import { gql } from "graphql-tag";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Token {
    token: String
  }

  type User {
    _id: String
    uid: String
    username: String!
    password: String!
    created_at: String
    token: String
  }

  type Friend {
    _id: Int!
    userID: String!
  }

  type Message {
    id: ID!
    content: String!
    user: User!
  }

  type Response {
    success: Boolean!
    message: String!
  }

  type CreateUserPayload {
    user: User
    response: Response
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    login(username: String!, password: String!): CreateUserPayload
    createUser(username: String!, password: String!): CreateUserPayload
    addFriend(uid1: String!, uid2: String!): CreateUserPayload
  }

  type Subscription {
    notification: User
  }
`;

export default typeDefs;
