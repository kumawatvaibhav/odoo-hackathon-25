import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
  getDashboardStats,
  getAllUsersForAdmin,
  deleteQuestion,
  deleteAnswer,
  updateUserRole
} from '../controllers/admin.js';

const router = express.Router();

router.use(adminAuth);
router.get('/dashboard', getDashboardStats); // Dashboard stats
router.get('/users', getAllUsersForAdmin);
router.patch('/users/:id/role', updateUserRole); // Update user role

router.delete('/questions/:id', deleteQuestion);
router.delete('/questions/:questionId/answers/:answerId', deleteAnswer);

export default router; 