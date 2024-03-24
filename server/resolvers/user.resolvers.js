import signUpController from '../controllers/signup.controller.js';
import loginController from '../controllers/login.controller.js';
import logoutController from '../controllers/logout.controller.js';
import userController from '../controllers/user.controller.js';

const userResolvers = {
  Query: {
    user: (_parent, _payload, context) => userController(context.req)
  },
  Mutation: {
    signup: (_parent, { username, name, password, gender }, context) => signUpController({ username, name, password, gender }, context.res),
    login: (_parent, { username, password }, context) => loginController({ username, password }, context.res),
    logout: (_parent, _payload, context) => logoutController(context.res)
  }
};

export default userResolvers; 