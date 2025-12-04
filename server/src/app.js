import express from 'express';

// Import route files
import patientsRegister from './routes/patientsregister.js';
import patientsUserdata from './routes/patientsuserdata.js';
import patientsLogin from './routes/patientslogin.js';
import patientsGoals from './routes/patientsgoals.js';

const app = express();

app.use(express.json());

// Register routes
app.use('/patients/register', patientsRegister);
app.use('/patients/userdata', patientsUserdata);
app.use('/patients/login', patientsLogin);
app.use('/patients/goals', patientsGoals);

app.get('/', (req, res) => {
  res.send('API is running - Healthcare Portal Backend');
});

export default app;