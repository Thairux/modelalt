const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set your uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid conflicts
    },
});

const upload = multer({ storage });

// Get profile data
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming you have user authentication
        res.json({
            bio: user.bio,
            portfolio: user.portfolio, // Adjust according to your schema
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Update profile
router.post('/update', upload.single('profilePicture'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (req.file) {
            user.profilePicture = req.file.path; // Save the path to the user object
        }
        user.bio = req.body.bio; // Update bio
        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = router;