import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

// 1. HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http:// localhost:3000/api/graphql', // HTTP endpoint
});

// // 2. WebSocket link for subscriptions
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: 'ws://localhost:5000/api/graphql', // WebSocket endpoint
//   })
// );

// 3. Split based on operation type (query/mutation over HTTP, subscription over WebSocket)
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink, // Use WebSocketLink for subscriptions
//   httpLink // Fallback to HttpLink for queries and mutations
// );

// 4. Create Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
