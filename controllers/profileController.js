import StudentProfile from '../models/studentProfileModel.js';
import FacultyProfile from '../models/facultyProfileModel.js';
import User from '../models/studentModel.js';
import Faculty from '../models/facultyModel.js';

export const createStudentProfile = async (req, res) => {
  try {
    const { user, ...profileData } = req.body;
    
    const student = await User.findById(user);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const existingProfile = await StudentProfile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profile = await StudentProfile.create({ user, ...profileData });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacultyProfile = async (req, res) => {
  try {
    const { faculty, ...profileData } = req.body;
    
    const facultyMember = await Faculty.findById(faculty);
    if (!facultyMember) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const existingProfile = await FacultyProfile.findOne({ faculty });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profile = await FacultyProfile.create({ faculty, ...profileData });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email rollNumber');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacultyProfile = async (req, res) => {
  try {
    const profile = await FacultyProfile.findOne({ faculty: req.params.facultyId })
      .populate('faculty', 'name email employeeId');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};