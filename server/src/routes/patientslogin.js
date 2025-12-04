import express from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import { Patient } from '../models/patient.js';

const router = express.Router();

// Patient login
router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Get patient data
    const patient = await Patient.findOne({ userId: user._id });

    // Generate JWT token
    const token = generateToken(user._id, user.email);

    res.json({ 
      message: 'Login successful', 
      user: userResponse,
      patient,
      token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;