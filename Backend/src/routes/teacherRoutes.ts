import { Router } from 'express';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', authorize('ADMIN'), createTeacher);
router.put('/:id', authorize('ADMIN'), updateTeacher);
router.delete('/:id', authorize('ADMIN'), deleteTeacher);

export default router;
