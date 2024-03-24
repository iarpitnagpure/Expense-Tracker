const userController = (req) => {
    try {
        if (req.user) {
            return req.user;
        } else {
            throw new Error('Looks like your session is expired, Please login again');
        }
    } catch (err) {
        throw new Error(err.message || 'Internal Server error in user controller');
    }
};

export default userController;