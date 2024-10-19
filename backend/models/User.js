import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);