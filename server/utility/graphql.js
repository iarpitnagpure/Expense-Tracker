import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import combineTypeDefs from '../typeDefs/index.js';
import combineResolvers from '../resolvers/index.js';

export const startApolloServer = async (app) => {
    const apolloServer = new ApolloServer({
        typeDefs: combineTypeDefs,
        resolvers: combineResolvers,
    });

    await apolloServer.start();

    app.use('/graphql',
        express.json(),
        cookieParser(),
        expressMiddleware(
            apolloServer,
            {
                context: async ({ req, res }) => {
                    const { token } = req.cookies;
                    if (token) {
                        const user = jwt.verify(token, process.env.TOKEN_KEY);
                        req.user = user;
                    }
                    return { req, res }
                }
            }
        )
    );
};
