const User = require('../models/User'); // Import User model

// Follow a user
exports.followUser = async (req, res) => {
    const { id } = req.params; // User ID to follow

    try {
        const user = await User.findById(req.userId);
        const targetUser = await User.findById(id);

        if (!user || !targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.following.includes(targetUser._id)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        user.following.push(targetUser._id);
        targetUser.followers.push(user._id);

        await user.save();
        await targetUser.save();

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    const { id } = req.params; // User ID to unfollow

    try {
        const user = await User.findById(req.userId);
        const targetUser = await User.findById(id);

        if (!user || !targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.following.includes(targetUser._id)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        user.following = user.following.filter(userId => userId.toString() !== id);
        targetUser.followers = targetUser.followers.filter(userId => userId.toString() !== id);

        await user.save();
        await targetUser.save();

        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};