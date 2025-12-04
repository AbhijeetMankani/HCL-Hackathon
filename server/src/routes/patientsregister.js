import express from 'express';
import bcrypt from 'bcrypt';
import { Patient } from '../models/patient.js';
import { User } from '../models/users.js';

const router = express.Router();

// Register a new patient
router.post('/', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.user.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10);

    // Create user with hashed password
    const user = new User({
      ...req.body.user,
      password: hashedPassword,
    });
    await user.save();

    // Create patient record linked to user
    const patient = new Patient({ ...req.body.patient, userId: user._id });
    await patient.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;