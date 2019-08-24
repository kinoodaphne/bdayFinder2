const express = require('express');
const router = express.Router();
const chatController = require('../../../controllers/api/v1/chats');
const passport = require('../../../passport/passport');

/* /api/v1/chat */
router.get("/", chatController.getAll);

router.get('/:id', passport.authenticate('jwt', {session: false}), chatController.getId);

router.post("/", chatController.create);

module.exports = router;