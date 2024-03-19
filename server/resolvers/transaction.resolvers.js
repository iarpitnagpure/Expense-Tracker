import { transactions, users } from '../dummyData/data.js';

const transactionResolvers = {
    Query: {
        transactions: () => {
            return transactions
        },
    }
};

export default transactionResolvers; 