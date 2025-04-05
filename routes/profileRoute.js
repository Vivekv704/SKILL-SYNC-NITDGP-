import { Router } from 'express';
import { 
  createStudentProfile,
  createFacultyProfile,
  getStudentProfile,
  getFacultyProfile 
} from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Student Profile Routes
router.post('/student', authMiddleware, createStudentProfile);
router.get('/student/:userId', authMiddleware, getStudentProfile);

// Faculty Profile Routes
router.post('/faculty', authMiddleware, createFacultyProfile);
router.get('/faculty/:facultyId', authMiddleware, getFacultyProfile);

export default router;