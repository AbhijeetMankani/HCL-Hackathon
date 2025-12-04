import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import connectDB from './db/db.js'; // Note the .js extension is required in ES6

// Load environment variables
dotenv.config();

// Connect to Database
// connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow frontend communication
app.use(cookieParser()); // Parse cookies

// Test Route
app.get('/', (req, res) => {
  res.send('API is running... Healthcare Portal Backend');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));