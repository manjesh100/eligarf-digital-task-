const express = require('express');
const router = express.Router();
const storyControllerObject= require('../controllers/storyController');
const middleware = require('../middleware/middleware');

router.post('/create-story',[middleware.JWTAuthData], storyControllerObject.createStory);
router.put('/update-story',[middleware.JWTAuthData], storyControllerObject.updateStory);
router.get('/story-list',[middleware.JWTAuthData], storyControllerObject.storyList);

module.exports = router;