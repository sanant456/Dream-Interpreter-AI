const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');
const authMiddleware = require('../middleware/auth');
const { validateDream } = require('../middleware/validation');

router.use(authMiddleware); // Apply to all dream routes

router.post('/', ...validateDream, dreamController.analyzeDream);
router.get('/', dreamController.getHistory);
router.get('/insights', dreamController.getInsights);

module.exports = router;
