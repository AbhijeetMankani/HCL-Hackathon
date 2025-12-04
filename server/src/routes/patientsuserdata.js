import express from 'express';
import { Patient } from '../models/patient.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Get patient data by userId
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.userId });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update patient data by userId
router.post('/:userId', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;