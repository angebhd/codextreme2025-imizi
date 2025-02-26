const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware')
const router = express.Router();

// Signup Route
router.post('/signup', userController.signup);

// Login Route
router.post('/login', userController.login);

module.exports = router;