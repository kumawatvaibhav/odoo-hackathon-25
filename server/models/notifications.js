import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
  recipient: {
    type: String,
    required: "Notification must have a recipient"
  },
  sender: {
    type: String,
    required: "Notification must have a sender"
  },
  type: {
    type: String,
    enum: ['answer', 'comment', 'mention', 'vote', 'accept'],
    required: "Notification must have a type"
  },
  questionId: {
    type: String,
    required: "Notification must be linked to a question"
  },
  answerId: {
    type: String,
    default: null
  },
  content: {
    type: String,
    required: "Notification must have content"
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Notification", notificationSchema) 