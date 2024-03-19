const transactionTypeDefs = `#graphql 
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    type Query {
        transactions: [Transaction]
    }
`;

export default transactionTypeDefs; 