import { users } from '../dummyData/data.js';

const userResolvers = {
  Query: {
    users: () => {
      return users
    },
  },
  Mutation: {
    signup: (_, { username, name, password, gender }) => {
      return users[0];
    },
    login: (_, { username, password }) => {
      console.log('username, password', username, password);
      return users;
    }
  }
};

export default userResolvers; 