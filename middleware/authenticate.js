const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for JWT
const secretKey = process.env.JWT_SECRET;

// Authentication middleware
module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};