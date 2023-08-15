const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router();

router.get('/user', authenticate, userController.getUserProfile);

module.exports = router;