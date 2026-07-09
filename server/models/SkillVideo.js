import mongoose from 'mongoose';

const skillVideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true } // Stores the path string (e.g., "/uploads/video-123.mp4")
}, { timestamps: true });

export default mongoose.model('SkillVideo', skillVideoSchema);