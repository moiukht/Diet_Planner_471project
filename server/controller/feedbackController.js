const User = require('../models/user');

// Controller to submit feedback
const submitFeedback = async (req, res) => {
    try {
        const { username, feedback } = req.body;
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'user') {
            return res.status(403).json({ message: "Only users can provide feedback" });
        }

        user.feedback=feedback;
        await user.save();

        res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Errorrr" });
    }
};

// Controller to view feedback (Only accessible to admins)
const viewFeedback = async (req, res) => {
    try {
        const feedbacks = await User.find({ role: 'user' }).select('feedback');

        res.status(200).json(feedbacks.map(user => user.feedback));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { submitFeedback, viewFeedback };
