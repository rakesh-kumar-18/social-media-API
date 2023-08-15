const express = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router();

router.post('/posts', authenticate, postController.createPost);
router.delete('/posts/:id', authenticate, postController.deletePost);
router.post('/like/:id', authenticate, postController.likePost);
router.post('/unlike/:id', authenticate, postController.unlikePost);
router.get('/posts/:id', authenticate, postController.getSinglePost);
router.get('/all_posts', authenticate, postController.getAllPostsByUser);

module.exports = router;