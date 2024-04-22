const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

// Route to view feedback (Only accessible to admins)
router.get('/feedback/view', feedbackController.viewFeedback);

module.exports = router;
