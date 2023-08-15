const express = require('express');
const followController = require('../controllers/followController');
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router();

router.post('/follow/:id', authenticate, followController.followUser);
router.post('/unfollow/:id', authenticate, followController.unfollowUser);

module.exports = router;