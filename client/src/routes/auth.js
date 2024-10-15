const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example of a protected route
router.get('/profile', auth, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', userId: req.user.userId });
});

module.exports = router;