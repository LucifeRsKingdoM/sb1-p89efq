import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  endDate: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidates: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);