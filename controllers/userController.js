const User = require('../models/User');
const Post = require('../models/Post');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userProfile = {
            userName: user.email,
            followersCount: user.followers.length,
            followingsCount: user.following.length,
        };

        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};