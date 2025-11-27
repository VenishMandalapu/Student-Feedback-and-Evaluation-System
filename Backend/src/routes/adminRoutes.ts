import { Router } from 'express';
import { getDashboardStats, getAnalytics } from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalytics);

export default router;
