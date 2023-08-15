const User = require('../models/User');
const Post = require('../models/Post');

// Create new post
exports.createPost = async (req, res) => {
    const { title, description } = req.body;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPost = new Post({
            title,
            description,
            creator: user._id,
        });

        await newPost.save();

        const postInfo = {
            postId: newPost._id,
            title: newPost.title,
            description: newPost.description,
            createdAt: newPost.createdAt,
        };

        res.json(postInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params; // Post ID to delete

    try {
        const user = await User.findById(req.userId);
        const post = await Post.findById(id);

        if (!user || !post) {
            return res.status(404).json({ message: 'User or post not found' });
        }

        if (post.creator.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await post.deleteOne();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    const { id } = req.params; // Post ID to like

    try {
        const user = await User.findById(req.userId);
        const post = await Post.findById(id);

        if (!user || !post) {
            return res.status(404).json({ message: 'User or post not found' });
        }

        if (post.likes.includes(user._id)) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        post.likes.push(user._id);
        await post.save();

        res.json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
    const { id } = req.params; // Post ID to unlike

    try {
        const user = await User.findById(req.userId);
        const post = await Post.findById(id);

        if (!user || !post) {
            return res.status(404).json({ message: 'User or post not found' });
        }

        if (!post.likes.includes(user._id)) {
            return res.status(400).json({ message: 'You have not liked this post' });
        }

        post.likes = post.likes.filter(userId => userId.toString() !== user._id.toString());
        await post.save();

        res.json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve a single post with likes and comments
exports.getSinglePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const postWithDetails = {
            postId: post._id,
            title: post.title,
            description: post.description,
            likesCount: post.likes.length,
            commentsCount: post.comments.length,
        };

        res.json(postWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve all posts created by the authenticated user
exports.getAllPostsByUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ creator: user._id })
            .sort({ createdAt: -1 })
            .exec();

        const formattedPosts = posts.map(post => ({
            id: post._id,
            title: post.title,
            desc: post.description,
            created_at: post.createdAt,
            comments: post.comments,
            likes: post.likes.length,
        }));

        res.json(formattedPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};