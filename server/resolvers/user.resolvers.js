import { users } from '../dummyData/data.js';

const userResolvers = {
  Query: {
    users: () => {
      return users
    },
  }
};

export default userResolvers; 