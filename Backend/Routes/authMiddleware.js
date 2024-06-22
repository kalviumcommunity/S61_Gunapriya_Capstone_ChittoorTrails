const jwt = require('jsonwebtoken');
const User = require('../Users/UserSchema');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:',decoded);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = { id: user._id, email: user.email };
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateUser;
