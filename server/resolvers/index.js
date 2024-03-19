import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user.resolvers.js';
import transactionResolvers from './transaction.resolvers.js';

const combineResolvers = mergeResolvers([userResolvers, transactionResolvers]);

export default combineResolvers;