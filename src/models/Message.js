const mongoose = require("mongoose");

// Define the Message Schema
const MessageSchema = mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  messages: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  // type: {  
  //   type: String,
  //   enum: ['text', 'image', 'video'],
  //   default: 'text',  // Default to text
  // },
});

module.exports = mongoose.model("Message", MessageSchema);
