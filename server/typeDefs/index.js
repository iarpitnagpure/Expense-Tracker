import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './user.typeDefs.js';
import transactionTypeDefs from './transaction.typeDefs.js';

const combineTypeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDefs]);

export default combineTypeDefs;