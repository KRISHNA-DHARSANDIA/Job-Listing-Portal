import { User } from '../models/user.model.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Registration
export const registerUser = async (req, res) => {
    const { fullname, email, phoneNumber, password, role } = req.body;

    try {
        // If Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Apllication
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        // Token Generation
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Email 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generating token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { fullname, phoneNumber, profile } = req.body;
    const userId = req.user.id; 

    try {
        // Update 
        const updatedUser = await User.findByIdAndUpdate(userId, {
            fullname,
            phoneNumber,
            profile,
        }, { new: true }); 

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
