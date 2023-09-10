import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './GraphQL/schema/type-Defs';
import resolvers from './GraphQL/graphql';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://martinfresh8:qwertyuiop123@cluster0.exeewjw.mongodb.net/")

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

