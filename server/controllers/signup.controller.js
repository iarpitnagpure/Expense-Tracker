import { hashSync } from 'bcrypt';
import Users from '../models/users.model.js';
import setCookies from '../utility/cookie.js';

const signUpController = async ({ username, name, password, gender }, res) => {
    try {
        if (username && name && password && gender) {
            const isUserExists = await Users.findOne({ username });
            if (!isUserExists) {
                const newUser = new Users({ username, name, password: hashSync(password, 10), gender });
                await newUser.save();
                await setCookies(newUser._id, res);
                return newUser;
            } else {
                throw new Error('User already exist')
            }
        } else {
            throw new Error('Please enter all required fields')
        }
    } catch (err) {
        throw new Error(err.message || "Internal server error");
    }
};

export default signUpController;