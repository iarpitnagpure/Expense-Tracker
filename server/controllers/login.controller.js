import { compareSync } from 'bcrypt';
import Users from '../models/users.model.js';
import setCookies from '../utility/cookie.js';

const loginController = async ({ username, password }, res) => {
    try {
        if (username && password) {
            const user = await Users.findOne({ username });
            if (user) {
                const isPasswordValid = compareSync(password, user?.password || "");
                if (isPasswordValid) {
                    await setCookies(user._id, res);
                    return user;
                } else {
                    throw new Error('Please enter correct username and password');
                }
            } else {
                throw new Error('Please enter correct username and password');
            }
        } else {
            throw new Error('Please enter all required fields')
        }
    } catch (err) {
        throw new Error(err.message || "Internal server error");
    }
};

export default loginController;