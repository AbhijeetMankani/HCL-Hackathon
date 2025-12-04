import express from 'express';
import { Patient } from '../models/patient.js';
import { User } from '../models/users.js';

const router = express.Router();

// Register a new patient
router.post('/', async (req, res) => {
  try {
    // Create user first, then patient
    const user = new User(req.body.user);
    await user.save();
    const patient = new Patient({ ...req.body.patient, userId: user._id });
    await patient.save();
    res.status(201).json({ user, patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;