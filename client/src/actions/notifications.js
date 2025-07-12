import { api } from '../api'

export const getNotifications = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/notifications/user/${userId}`)
    return response
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}

export const markAsRead = (notificationId) => async (dispatch) => {
  try {
    const response = await api.patch(`/notifications/mark-read/${notificationId}`)
    return response
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}

export const markAllAsRead = (userId) => async (dispatch) => {
  try {
    const response = await api.patch(`/notifications/mark-all-read/${userId}`)
    return response
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    throw error
  }
}

export const getUnreadCount = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/notifications/unread-count/${userId}`)
    return response
  } catch (error) {
    console.error('Error fetching unread count:', error)
    throw error
  }
}

export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    const response = await api.delete(`/notifications/${notificationId}`)
    return response
  } catch (error) {
    console.error('Error deleting notification:', error)
    throw error
  }
} 