const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profilePicture: { type: String }, // New field for profile picture
    bio: { type: String }, // New field for bio
    portfolio: [{ title: String }], // Adjust according to your needs
});

module.exports = mongoose.model('User', UserSchema);