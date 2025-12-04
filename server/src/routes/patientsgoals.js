import express from 'express';
import { WellnessGoal } from '../models/wellnessgoals.js';

const router = express.Router();

// Get all goals for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const goals = await WellnessGoal.find({ patientId: req.params.patientId });
    res.json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new goal for a patient
router.post('/:patientId', async (req, res) => {
  try {
    const goal = new WellnessGoal({ ...req.body, patientId: req.params.patientId });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;