import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "@/lib/graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = startServerAndCreateNextHandler(apolloServer);

export const GET = handler;
export const POST = handler;