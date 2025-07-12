import Questions from '../models/questions.js'
import Users from '../models/auth.js'
import Notifications from '../models/notifications.js'

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { recipient, sender, type, questionId, answerId, content } = req.body

    const newNotification = new Notifications({
      recipient,
      sender,
      type,
      questionId,
      answerId,
      content
    })

    const savedNotification = await newNotification.save()
    res.status(200).json(savedNotification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params

    const notifications = await Notifications.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(50)

    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params

    const notification = await Notifications.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    )

    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Mark all notifications as read for a user
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params

    await Notifications.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true }
    )

    res.status(200).json({ message: "All notifications marked as read" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get unread notification count
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params

    const count = await Notifications.countDocuments({
      recipient: userId,
      isRead: false
    })

    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params

    await Notifications.findByIdAndDelete(notificationId)

    res.status(200).json({ message: "Notification deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
} 