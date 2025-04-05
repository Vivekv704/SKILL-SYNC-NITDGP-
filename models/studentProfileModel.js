import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true
  },
  sem1: {
    sgpa: Number,
    maths: Number
  },
  sem2: {
    sgpa: Number,
    computer: Number
  },
  sem3: {
    sgpa: Number,
    dataStructuresTheory: Number,
    dsaLab: Number
  },
  interests: [String],
  goal: String,
  extracurricular: String,
  age: Number,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  }
}, { timestamps: true });

export default mongoose.model('StudentProfile', studentProfileSchema);