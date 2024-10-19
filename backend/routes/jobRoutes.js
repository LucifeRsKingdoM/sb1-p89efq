import express from 'express';
import Job from '../models/Job.js';
import { auth } from '../middleware/auth.js';
import { sendJobAlertEmails } from '../utils/emailService.js';

const router = express.Router();

// Create a new job
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      company: req.user.id,
      candidates: candidates.split(',').map(email => email.trim()),
    });

    const savedJob = await newJob.save();

    // Send job alert emails to candidates
    await sendJobAlertEmails(savedJob);

    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs for the logged-in company
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;