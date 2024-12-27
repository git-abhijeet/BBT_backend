const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadVideo, getVideos } = require('../controllers/videoController');
const { videoUpload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/uploadVideo/:userId', authMiddleware, videoUpload.single('video'), uploadVideo);
router.get('/getVideos/:userName?', authMiddleware, getVideos);

module.exports = router;