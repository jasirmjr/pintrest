import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import adminRoutes from './routes/admin.js'; // 🌟 Use IMPORT instead of require!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017/';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to local MongoDB! 🍃'))
  .catch((error) => console.error('MongoDB database connection error ❌:', error));

// Attach Routes
app.use('/api/admin', adminRoutes);

// Public categories route for landing page
app.get('/api/categories', async (req, res) => {
  try {
    const Category = mongoose.model('Category');
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: "Welcome to the Skillex Backend Server! 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});