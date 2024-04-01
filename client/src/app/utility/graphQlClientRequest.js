const { GraphQLClient } = require("graphql-request");

const graphQlClientRequest = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}graphql`,
    {
        credentials: "include",
    }
);

export default graphQlClientRequest;