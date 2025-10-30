import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// All routes are protected
router.use(protect);

// Student routes
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

// Admin only routes
router.post('/', authorize('ADMIN'), createStudent);
router.put('/:id', authorize('ADMIN'), updateStudent);
router.delete('/:id', authorize('ADMIN'), deleteStudent);

export default router;
