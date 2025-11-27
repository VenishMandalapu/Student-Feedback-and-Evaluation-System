import { Router } from 'express';
import {
  getAllFeedbackForms,
  createFeedbackForm,
  submitFeedback,
  getFeedbackResults
} from '../controllers/feedbackController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/forms', getAllFeedbackForms);
router.post('/forms', authorize('TEACHER', 'ADMIN'), createFeedbackForm);
router.post('/submit', authorize('STUDENT'), submitFeedback);
router.get('/results/:courseId', authorize('TEACHER', 'ADMIN'), getFeedbackResults);

export default router;
