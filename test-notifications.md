# Notification System Test Guide

## Backend Tests

### 1. Test Notification Creation
```bash
# Test creating a notification
curl -X POST http://localhost:5000/notifications/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "recipient": "USER_ID",
    "sender": "SENDER_ID", 
    "type": "answer",
    "questionId": "QUESTION_ID",
    "content": "Test notification"
  }'
```

### 2. Test Getting Notifications
```bash
# Get notifications for a user
curl -X GET http://localhost:5000/notifications/user/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Test Unread Count
```bash
# Get unread notification count
curl -X GET http://localhost:5000/notifications/unread-count/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Frontend Tests

### 1. Test Notification Icon
- Log in to the application
- Check if notification bell appears in navbar
- Verify unread count badge appears when there are unread notifications

### 2. Test Notification Dropdown
- Click on notification bell
- Verify dropdown opens with notifications list
- Test clicking on a notification to mark as read
- Test clicking outside to close dropdown

### 3. Test Answer Notifications
- Post a question
- Have another user answer the question
- Check if question owner receives notification

### 4. Test Vote Notifications
- Vote on someone else's question
- Check if question owner receives notification

### 5. Test Accept Answer Notifications
- As question owner, accept an answer
- Check if answer author receives notification

## Features Implemented

✅ **Notification Model** - MongoDB schema for notifications
✅ **Notification Controller** - Backend logic for CRUD operations
✅ **Notification Routes** - API endpoints for notifications
✅ **Notification Icon Component** - Frontend notification bell with dropdown
✅ **Notification Actions** - Redux actions for notification management
✅ **Answer Notifications** - Automatic notifications when answers are posted
✅ **Vote Notifications** - Notifications for question votes
✅ **Accept Answer Notifications** - Notifications when answers are accepted
✅ **Accept Answer Feature** - Question owners can accept answers
✅ **Real-time Updates** - Notifications refresh every 30 seconds
✅ **Click Outside to Close** - Dropdown closes when clicking outside
✅ **Unread Count Badge** - Shows number of unread notifications
✅ **Responsive Design** - Works on mobile and desktop

## Notification Types Supported

1. **answer** - When someone answers your question
2. **vote** - When someone votes on your question  
3. **accept** - When your answer is accepted
4. **comment** - When someone comments (ready for future implementation)
5. **mention** - When someone mentions you (ready for future implementation)

## Files Created/Modified

### Backend
- `server/models/notifications.js` - Notification schema
- `server/controllers/notifications.js` - Notification controller
- `server/routes/Notifications.js` - Notification routes
- `server/index.js` - Added notification routes
- `server/controllers/answer.js` - Added notification creation for answers
- `server/controllers/questions.js` - Added notification creation for votes and accept answer
- `server/models/questions.js` - Added isAccepted field to answers

### Frontend
- `client/src/components/NotificationIcon/NotificationIcon.jsx` - Notification bell component
- `client/src/components/NotificationIcon/NotificationIcon.css` - Notification styles
- `client/src/actions/notifications.js` - Redux actions for notifications
- `client/src/components/Navbar/Navbar.jsx` - Added notification icon to navbar
- `client/src/actions/question.js` - Added accept answer action
- `client/src/api/index.js` - Added accept answer API
- `client/src/pages/Questions/DisplayAnswer.jsx` - Added accept answer functionality
- `client/src/pages/Questions/Questions.css` - Added accepted answer styles 