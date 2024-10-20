import { gql } from "graphql-tag"

const typeDefs = gql`
  type Todo{
    id: ID!
    task: String!
    completed: Boolean!
  }

  type Query{
    getTodos: [Todo]
  }

  type Mutation{
    createTodo(task: String!): Todo
  }
`;

let todos = [
  { id: '1', task: 'Learn GraphQL', completed: false },
  { id: '2', task: 'Build a Next.js App', completed: false }
];

const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    createTodo: (_, { task }) => {
      const newTodo = { id: `${todos.length + 1}`, task, completed: false };
      todos.push(newTodo);
      return newTodo;
    }
  }
}

export { typeDefs, resolvers };