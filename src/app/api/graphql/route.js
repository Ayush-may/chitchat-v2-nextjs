import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import typeDefs from '@/app/api/graphql/utility/typeDefs';
import resolvers from '@/app/api/graphql/utility/resolver';

// 1. Create the Apollo Server with schema (typeDefs, resolvers)
const apolloServer = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

// 2. Next.js config (for disabling bodyParser in API routes)
export const config = {
  api: {
    bodyParser: false,
  },
};

// 3. Start Apollo Server and create the Next.js handler
const handler = startServerAndCreateNextHandler(apolloServer);

// 4. Create the HTTP server to handle both HTTP and WebSocket requests
const httpServer = createServer(handler);

// 5. WebSocket Server setup
let wsServer;

// Check if wsServer is not already running
if (!wsServer) {
  // Set up WebSocket server
  wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api/graphql',
  });

  // Set up WebSocket handling for GraphQL subscriptions
  useServer({ schema: apolloServer.schema }, wsServer);
}

// Function to close the server if it's already running
function closeServerIfRunning() {
  if (httpServer.listening) {
    console.log('Closing existing server on port 5000...');
    httpServer.close();
  }
}

// Close the server if already running (to handle restarts)
closeServerIfRunning();

// 6. Start the server if not already running
httpServer.listen(5000, () => {
  console.log(`🚀 Server ready at ws://localhost:5000/api/graphql`);
});

// 7. Export handler for HTTP requests (GET and POST)
export { handler as GET, handler as POST };
