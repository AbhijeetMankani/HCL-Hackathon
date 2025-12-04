import express from 'express';
import { WellnessGoal } from '../models/wellnessgoals.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Get all goals for a patient
router.get('/:patientId', authenticateToken, async (req, res) => {
  try {
    const goals = await WellnessGoal.find({ patientId: req.params.patientId });
    res.json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new goal for a patient
router.post('/:patientId', authenticateToken, async (req, res) => {
  try {
    const goal = new WellnessGoal({ ...req.body, patientId: req.params.patientId });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a wellness goal
router.put('/:patientId/:goalId', authenticateToken, async (req, res) => {
  try {
    const goal = await WellnessGoal.findOneAndUpdate(
      { _id: req.params.goalId, patientId: req.params.patientId },
      req.body,
      { new: true }
    );
    
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update goal progress
router.patch('/:patientId/:goalId/progress', authenticateToken, async (req, res) => {
  try {
    const goal = await WellnessGoal.findOne({ 
      _id: req.params.goalId, 
      patientId: req.params.patientId 
    });
    
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    // Use the updateProgress method from the model
    await goal.updateProgress(req.body.currentValue);
    
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a wellness goal
router.delete('/:patientId/:goalId', authenticateToken, async (req, res) => {
  try {
    const goal = await WellnessGoal.findOneAndDelete({ 
      _id: req.params.goalId, 
      patientId: req.params.patientId 
    });
    
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;