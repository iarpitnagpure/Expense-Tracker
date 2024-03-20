const userTypeDefs = `#graphql 
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String!
        gender: String!
    }

    type Query {
        users: [User!]
    }

    type Mutation {
        signup(username: String!, name: String!, password: String!, gender: String!): User!
        login(username: String!, password: String!): [User!]
    }
`;

export default userTypeDefs; 