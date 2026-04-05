const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', authLimiter, ...validateRegister, authController.register);
router.post('/login', authLimiter, ...validateLogin, authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
