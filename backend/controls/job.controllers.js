import { Job } from '../models/job.model.js'; 
import { User } from '../models/user.model.js'; 

// Creating an New Job 
export const createJob = async (req, res) => {
    const { title, description, company, location, salary, type } = req.body;
    const userId = req.user.id; 

    try {
        const newJob = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            type,
            postedBy: userId, // Associate the job with the user
        });

        res.status(201).json({ job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'fullname email'); // Populate user details
        res.json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Job by ID
export const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id).populate('postedBy', 'fullname email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Job
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, company, location, salary, type } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, {
            title,
            description,
            company,
            location,
            salary,
            type,
        }, { new: true }); 

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ job: updatedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
