const router = require('express').Router();
const aiController = require('../controllers/ai.controller');

router.post('/EmoAI',aiController.genResponse);

module.exports = router;