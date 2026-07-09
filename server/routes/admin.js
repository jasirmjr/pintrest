import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Category from '../models/Category.js';
import SkillVideo from '../models/SkillVideo.js';

const router = express.Router();

// Ensure uploads folder directory exists safely on your hard drive
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure how files are named and saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 🔒 ADMIN LOGIN AUTHENTICATION ROUTE
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Welcome Admin! 🔑" });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials." });
});

// ==========================================================================
// 📚 COURSE CATEGORIES MANAGEMENT
// ==========================================================================

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    const { title, duration } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image for the category." });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const newCategory = new Category({ title, duration, img: imagePath });
    res.status(201).json(await newCategory.save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================================================
// 🎥 SKILL VIDEO MANAGEMENT
// ==========================================================================

router.get('/video', async (req, res) => {
  try {
    const videoData = await SkillVideo.findOne().sort({ createdAt: -1 });
    res.json(videoData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please select a valid video file to upload." });
    }
    const videoPath = `/uploads/${req.file.filename}`;
    const newVideo = new SkillVideo({ videoUrl: videoPath });
    res.status(201).json(await newVideo.save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🌟 THE CRITICAL ES MODULE EXPORT LINE 🌟
export default router;