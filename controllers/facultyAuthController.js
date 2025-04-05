import Faculty from '../models/facultyModel.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

export const facultyRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, employeeId, password } = req.body;
    
    // Check if faculty exists
    const existingFaculty = await Faculty.findOne({ $or: [{ email }, { employeeId }] });
    if (existingFaculty) {
      return res.status(400).json({ message: 'Faculty already exists with this email or employee ID' });
    }

    const faculty = await Faculty.create({ name, email, phone, employeeId, password });
    
    res.status(201).json({
      message: 'Faculty registered successfully',
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        employeeId: faculty.employeeId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const facultyLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { employeeId, password } = req.body;
    
    const faculty = await Faculty.findOne({ employeeId }).select('+password');
    if (!faculty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Faculty login successful',
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        employeeId: faculty.employeeId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};