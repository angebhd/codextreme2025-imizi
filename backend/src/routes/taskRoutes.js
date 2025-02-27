const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticate, isParent } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/create', authenticate, isParent, taskController.create);

// router.post('/invite', authenticate, taskController.invite);
// router.post('/join', authenticate, taskController.join);

module.exports = router;