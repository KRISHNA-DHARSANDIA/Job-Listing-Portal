import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} from '../controls/job.controllers.js'; 
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs); 
router.get('/:id', getJobById); 

//Admin's Protected routes For (creating, Updating,)
// router.post('/', protect, admin, createJob); 
// router.put('/:id', protect, admin, updateJob); 
// router.delete('/:id', protect, admin, deleteJob); 

export default router;
