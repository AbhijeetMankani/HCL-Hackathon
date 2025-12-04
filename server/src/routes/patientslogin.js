import express from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';

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

    // You can add JWT token generation here
    res.json({ message: 'Login successful', user: userResponse });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;