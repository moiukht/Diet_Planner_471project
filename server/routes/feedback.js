const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controller/feedbackController');

// Route to submit feedback
router.post('/', submitFeedback);

module.exports = router;
