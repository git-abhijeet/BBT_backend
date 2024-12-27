const multer = require('multer');

const storage = multer.memoryStorage();
const imagekit = require('../config/imageConfig');
// const upload = multer({ storage: storage });

// File type filter for images
const imageFileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files (jpeg, png, gif) are allowed!'), false);
    }
};

// File type filter for videos
const videoFileFilter = (req, file, cb) => {
    console.log("🚀 ~ videoFileFilter ~ file:", file)
    const allowedMimeTypes = ['video/mp4', 'video/avi', 'video/mov'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only video files (mp4, avi, mov) are allowed!'), false);
    }
};

// Image upload configuration
const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 1000 * 1024 },  // Max file size = 1 MB
    fileFilter: imageFileFilter,
});

// Video upload configuration
const videoUpload = multer({
    storage: storage,
    limits: { fileSize: 6 * 1024 * 1024 },  // Max file size = 6 MB
    fileFilter: videoFileFilter,
});


const uploadFile = async (file, fileName, folder, tags = []) => {
    try {
        const result = await new Promise((resolve, reject) => {
            imagekit.upload(
                {
                    file: file,
                    fileName: fileName,
                    tags: tags,
                    folder: folder,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return result;
    } catch (error) {
        throw new Error("Error uploading image: " + error.message);
    }
};


module.exports = { imageUpload, videoUpload, uploadFile };