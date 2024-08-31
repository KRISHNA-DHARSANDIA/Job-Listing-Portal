import express from 'express';
import {
    registerUser,
    loginUser,
    updateUserProfile
} from '../controls/user.controllers.js';
// import { protect, admin } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Public route
router.post('/register', registerUser); 
router.post('/login', loginUser); 

// Updating route
// router.put('/profile', protect, updateUserProfile); 

// Admin route 
// router.get('/admin', protect, admin, (req, res) => {
//     res.send('Admin access granted');
// });

export default router;
