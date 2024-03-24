import signUpController from '../controllers/signup.controller.js';
import loginController from '../controllers/login.controller.js';
import logoutController from '../controllers/logout.controller.js';
import { users } from '../dummyData/data.js';

const userResolvers = {
  Query: {
    users: () => {
      return users
    },
  },
  Mutation: {
    signup: (_parent, { username, name, password, gender }, context) => signUpController({ username, name, password, gender }, context.res),
    login: (_parent, { username, password }, context) => loginController({ username, password }, context.res),
    logout: (_parent, _payload, context) => logoutController(context.res)
  }
};

export default userResolvers; 