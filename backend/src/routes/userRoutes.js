const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware')
const router = express.Router();

// Signup Route
router.post('/signup', userController.signup);

// Login Route
router.post('/login', userController.login);
router.post('/getData', authenticate, userController.getData);
// Google OAuth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session:false }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' , session:false}), userController.googleLogin);

module.exports = router;