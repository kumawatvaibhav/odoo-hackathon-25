import express from 'express'
import { createNotification, getNotifications, markAsRead, markAllAsRead, getUnreadCount, deleteNotification } from '../controllers/notifications.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/create', auth, createNotification)
router.get('/user/:userId', auth, getNotifications)
router.patch('/mark-read/:notificationId', auth, markAsRead)
router.patch('/mark-all-read/:userId', auth, markAllAsRead)
router.get('/unread-count/:userId', auth, getUnreadCount)
router.delete('/:notificationId', auth, deleteNotification)

export default router 