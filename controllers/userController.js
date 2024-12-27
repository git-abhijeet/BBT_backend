const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generatePassword } = require('../utils/generatePassword');
const { sendWelcomeEmail } = require('../utils/sendEmail');
const { uploadFile } = require('../utils/fileUpload');

// Signup a new user
const signupUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, mobileNum } = req.body;
        console.log("🚀 ~ signupUser ~ req.body:", req.body)

        const password = generatePassword(firstName, lastName, mobileNum);
        console.log("🚀 ~ signupUser ~ password:", password)

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🚀 ~ signupUser ~ hashedPassword:", hashedPassword)

        const newUser = new User({ firstName, lastName, userName, email, mobileNum, password: hashedPassword });
        await newUser.save();

        // Send welcome email
        await sendWelcomeEmail(email, firstName, lastName, userName, mobileNum, password);
        res.status(201).json({ message: 'User signed up', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log("🚀 ~ loginUser ~ req.body:", req.body)
        const user = await User.findOne({ userName });
        console.log("🚀 ~ loginUser ~ user:", user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🚀 ~ loginUser ~ isMatch:", isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentialscsnjanckan' });
        }
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("🚀 ~ loginUser ~ token:", token)
        const data = {
            user,
            token,
        }
        res.status(200).json({ message: 'User logged in Successfully', data });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        console.log("🚀 ~ updateProfile ~ req.body:", req.body)
        console.log("🚀 ~ updateProfile ~ req.params:", req.params)
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        console.log("🚀 ~ updateProfile ~ user:", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.file) {
            const img = req.file
            console.log("🚀 ~ updateProfile ~ img:", img)
            const result = await uploadFile(img.buffer, img.originalname, 'profile', ['profile']);
            user.imgThumbnailUrl = result.thumbnailUrl;
            user.imgUrl = result.url;
        }
        const { bio } = req.body;

        if (bio && bio.length > 500) {
            return res.status(400).json({ message: 'Bio must not exceed 500 characters.' });
        }

        if (bio) user.bio = bio;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.log("🚀 ~ updateProfile ~ error:", error)
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

module.exports = { signupUser, loginUser, updateProfile };
