const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const User = require('../models/users');

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

module.exports = router;