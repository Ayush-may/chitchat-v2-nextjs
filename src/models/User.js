import mongoose, { mongo } from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: [true, "Username is required"],
  //   unique: true,
  //   lowercase: true,
  //   trim: true
  // },
  created_at: {
    type: Date,
    default: Date.now
  },
  // messages: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Message"
  // }]
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;