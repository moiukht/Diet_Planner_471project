const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController");
const userController = require('../controller/userControllers');
const User = require("../models/user"); 
const {submitFeedback} = require('../controller/feedbackController');
const feedbackRoutes = require('./feedback');
// Route to update user profile
// router.put('/:username', userController.updateUserProfile);
router.get('/profile/:username', userProfileController.getUserProfile);

module.exports = router;

router.use('/feedback', feedbackRoutes);
//CUT THIS LATER
// Route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Route to submit feedback
router.post('/feedback', submitFeedback);


module.exports = router;


