import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', authorize('ADMIN'), createCourse);
router.put('/:id', authorize('ADMIN'), updateCourse);
router.delete('/:id', authorize('ADMIN'), deleteCourse);

export default router;
