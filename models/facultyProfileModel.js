import mongoose from "mongoose";

const facultyProfileSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
    unique: true
  },
  subjectSpecialization: [String],
  yearsOfExperience: Number,
  age: Number,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  }
}, { timestamps: true });

export default mongoose.model('FacultyProfile', facultyProfileSchema);