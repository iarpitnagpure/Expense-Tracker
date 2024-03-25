const transactionTypeDefs = `#graphql 
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        date: String!
    }

    type Query {
        transactions: [Transaction]
    }

    type Mutation {
        addTransaction(description: String!, paymentType: String!, category: String!,amount: Float!, date: String!): Transaction!
        updateTransaction(transactionId: ID!, description: String, paymentType: String, category: String,amount: Float, date: String): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }
`;

export default transactionTypeDefs; 