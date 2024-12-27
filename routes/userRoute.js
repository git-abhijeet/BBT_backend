const express = require('express');

const { signupUser, loginUser, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { imageUpload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/profile/:userId', authMiddleware, imageUpload.single('img'), updateProfile);

module.exports = router;
