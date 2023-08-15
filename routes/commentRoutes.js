const express = require('express');
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router();

router.post('/comment/:id', authenticate, commentController.addComment);

module.exports = router;