import Student from '../models/studentModel.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
  try {
    const { name, email, phone, rollNumber, password } = req.body;
    
    // Check required fields
    if (!name || !email || !phone || !rollNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this email or roll number' });
    }

    const newStudent = await Student.create({ name, email, phone, rollNumber, password });
    res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        rollNumber: newStudent.rollNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    
    if (!rollNumber || !password) {
      return res.status(400).json({ message: 'Roll number and password are required' });
    }

    const student = await Student.findOne({ rollNumber }).select('+password');
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login };  // Named exports instead of default export