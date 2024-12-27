const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNum: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    imgUrl: {
        type: String,
    },
    imgThumbnailUrl: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
