const express = require('express');
const familyController = require('../controllers/familyController');
const { authenticate } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/create', authenticate, familyController.create);

router.post('/invite', authenticate, familyController.invite);
router.post('/join', authenticate, familyController.join);

module.exports = router;