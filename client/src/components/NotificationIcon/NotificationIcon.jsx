import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getNotifications, markAsRead, getUnreadCount } from '../../actions/notifications'
import { useDispatch } from 'react-redux'
import './NotificationIcon.css'

const NotificationIcon = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch()
  const dropdownRef = useRef(null)

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await dispatch(getNotifications(User.result._id))
      setNotifications(response.payload || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }, [dispatch, User?.result?._id])

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await dispatch(getUnreadCount(User.result._id))
      setUnreadCount(response.payload?.count || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }, [dispatch, User?.result?._id])

  useEffect(() => {
    if (User?.result?._id) {
      fetchNotifications()
      fetchUnreadCount()
      
      // Refresh notifications every 30 seconds
      const interval = setInterval(() => {
        fetchNotifications()
        fetchUnreadCount()
      }, 30000)
      
      return () => clearInterval(interval)
    }
  }, [User?.result?._id, fetchNotifications, fetchUnreadCount])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await dispatch(markAsRead(notification._id))
        setUnreadCount(prev => Math.max(0, prev - 1))
        setNotifications(prev => 
          prev.map(n => 
            n._id === notification._id ? { ...n, isRead: true } : n
          )
        )
      } catch (error) {
        console.error('Error marking notification as read:', error)
      }
    }
    setIsOpen(false)
  }

  const formatTime = (createdAt) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diffInMinutes = Math.floor((now - created) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (!User?.result?._id) return null

  return (
    <div className="notification-container" ref={dropdownRef}>
      <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>
      
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount} unread</span>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-content">
                    <p>{notification.content}</p>
                    <span className="notification-time">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationIcon 