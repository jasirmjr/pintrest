import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  img: { type: String, required: true } // This will hold the file upload string path (e.g., "/uploads/image-123.jpg")
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);