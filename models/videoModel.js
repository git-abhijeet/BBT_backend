const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
        maxlength: 120,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
