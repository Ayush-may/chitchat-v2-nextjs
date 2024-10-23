import mongoose from "mongoose";

const FriendSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  }
  ,
  created_at: {
    type: Date,
    default: Date.now
  }
  ,
  message: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
});

const FriendModel = mongoose.models.Friend || mongoose.model('Friend', FriendSchema);
export default FriendModel;