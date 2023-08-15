const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Add comment to a post
exports.addComment = async (req, res) => {
    const { id } = req.params; // Post ID to comment on
    const { text } = req.body;

    try {
        const user = await User.findById(req.userId);
        const post = await Post.findById(id);

        if (!user || !post) {
            return res.status(404).json({ message: 'User or post not found' });
        }

        const newComment = new Comment({
            text,
            creator: user._id,
        });

        await newComment.save();

        post.comments.push(newComment.text);
        await post.save();

        res.json({ commentId: newComment._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};