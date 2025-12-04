import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import app from './app.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));