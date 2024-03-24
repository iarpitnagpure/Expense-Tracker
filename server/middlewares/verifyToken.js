import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const user = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = user;
            next();
        } catch (e) {
            res.status(400).send({ isError: true, error: 'Error in auth middleware' });
        }
    }
};

export default verifyToken;