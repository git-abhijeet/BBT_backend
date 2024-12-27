const User = require('../models/userModel');
const Video = require('../models/videoModel');
const { uploadFile } = require('../utils/fileUpload');


const uploadVideo = async (req, res) => {
    try {
        console.log("🚀 ~ updateProfile ~ req.body:", req.body)
        console.log("🚀 ~ updateProfile ~ req.params:", req.params)
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const { title, description } = req.body;
        console.log("🚀 ~ uploadVideo ~ title:", title)
        console.log("🚀 ~ uploadVideo ~ description:", description)
        const video = req.file;
        console.log("🚀 ~ uploadVideo ~ video:", video)

        if (!title || title.length > 30) {
            return res.status(400).json({ message: 'Title must not exceed 30 characters.' });
        }

        if (!description || description.length > 120) {
            return res.status(400).json({ message: 'Description must not exceed 120 characters.' });
        }

        if (!video) {
            return res.status(400).json({ message: 'Video file is required.' });
        }

        const user = await User.findById(userId);
        console.log("🚀 ~ updateProfile ~ user:", user)

        const result = await uploadFile(video.buffer, video.originalname, 'video', ['video']);
        console.log("🚀 ~ uploadVideo ~ result:", result)

        const newVideo = new Video({
            title,
            description,
            videoUrl: result.url,
            user: user._id,
        });

        await newVideo.save();

        res.status(201).json({ message: 'Video uploaded successfully', data: newVideo });

    } catch (error) {
        res.status(500).json({ message: 'Error uploading video', error });
    }
}

const getVideos = async (req, res) => {
    try {
        const { userId } = req.params;
        const query = userId ? { user: userId } : {};
        const videos = await Video.find(query).populate('user', 'email firstName userName imgUrl');
        console.log("🚀 ~ getVideos ~ videos:", videos)
        res.status(200).json({ data: videos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
}

module.exports = { uploadVideo, getVideos };