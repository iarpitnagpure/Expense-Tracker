const userTypeDefs = `#graphql 
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String!
        gender: String!
    }

    type LogoutResponse {
        isUserLoggedOut: Boolean!
    }

    type Query {
        user: User
    }

    type Mutation {
        signup(username: String!, name: String!, password: String!, gender: String!): User
        login(username: String!, password: String!): User
        logout: LogoutResponse
    }
`;

export default userTypeDefs; 