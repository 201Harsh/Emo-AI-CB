const router = require('express').Router();
const aiController = require('../controllers/ai.controller');
const UserMiddleware = require('../middlewares/user.middleware');

router.post('/EmoAI', UserMiddleware.AuthUser, aiController.genResponse);

module.exports = router;