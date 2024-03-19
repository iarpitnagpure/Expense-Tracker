GraphQl:
GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. 
It was developed by Facebook in 2012 and open-sourced in 2015.

NPM Library:
- graphql
- @apollo/server: 
    Apollo Server provides a simple API for integrating with any Node.js web framework or serverless environment.
    package itself ships with a minimally-configurable, standalone web server which handles CORS and body parsing out of the box. Integrations with other environments are community-maintained.
- @graphql-tools/merge
    Schema merging (@graphql-tools/merge and @graphql-tools/schema) consolidates the type definitions and resolvers from many local schema instances into a single executable schema.

// Create new express server
const app = express();

startApolloServer(app);

// Create new apollo server and start
export const startApolloServer = async (app) => {
    const apolloServer = new ApolloServer({
        typeDefs: combineTypeDefs,
        resolvers: combineResolvers
    });

    await apolloServer.start();

    app.use('/graphql', express.json(), expressMiddleware(apolloServer));
};

TypeDefs (Type Definitions):
typeDefs stands for type definitions. It's a string (or an array of strings) that defines the shape of the GraphQL schema. GraphQL uses a schema definition language (SDL) to define types, queries, mutations, subscriptions, and more.
Example:
    type User {
        id: ID!
        name: String!
        email: String!
    }

resolvers:
Resolvers are functions responsible for fetching the data for each field in your schema. Each field in your GraphQL schema corresponds to a resolver function that returns the data for that field.
Resolvers are organized by type and field name, mirroring the structure of your type definitions. They are usually defined as an object where keys correspond to type names and values are objects where keys correspond to field names.
Example:
    const resolvers = {
        Query: {
            users: () => {
                // Resolver logic to fetch users from database or any other source
                return [{ id: 1, name: "Alice", email: "alice@example.com" }];
            }
        }
    };