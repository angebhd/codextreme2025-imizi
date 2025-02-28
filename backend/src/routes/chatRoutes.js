const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController3');

router.post("/", chatController.chat);

module.exports = router;
