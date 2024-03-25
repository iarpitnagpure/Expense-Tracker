import { createTransaction, deleteTransaction, getAllTransaction, updateTransaction } from '../controllers/transactions.controller.js';

const transactionResolvers = {
    Query: {
        transactions: (_parent, _payload, context) => getAllTransaction(context.req)
    },
    Mutation: {
        addTransaction: (_parent, payload, context) => createTransaction(payload, context.req),
        updateTransaction: (_parent, payload, context) => updateTransaction(payload, context.req),
        deleteTransaction: (_parent, payload, context) => deleteTransaction(payload, context.req),
    }
};

export default transactionResolvers; 