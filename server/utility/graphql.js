import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import combineTypeDefs from '../typeDefs/index.js';
import combineResolvers from '../resolvers/index.js';

export const startApolloServer = async (app) => {
    const apolloServer = new ApolloServer({
        typeDefs: combineTypeDefs,
        resolvers: combineResolvers
    });

    await apolloServer.start();

    app.use('/graphql', express.json(), expressMiddleware(apolloServer));
};
