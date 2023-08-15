const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
require('dotenv').config();

// Secret key for JWT
const secretKey = process.env.JWT_SECRET;

// Authenticate user and generate JWT token
exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};