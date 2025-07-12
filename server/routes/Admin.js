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

// All routes require admin authentication
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard', getDashboardStats);

// Get all users
router.get('/users', getAllUsersForAdmin);

// Update user role
router.patch('/users/:id/role', updateUserRole);

// Delete question
router.delete('/questions/:id', deleteQuestion);

// Delete answer
router.delete('/questions/:questionId/answers/:answerId', deleteAnswer);

export default router; 