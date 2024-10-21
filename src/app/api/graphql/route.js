import { ApolloServer } from "@apollo/server";
import typeDefs from "@/app/api/graphql/utility/typeDefs";
import resolvers from "@/app/api/graphql/utility/resolver";
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

export { handler as GET, handler as POST };