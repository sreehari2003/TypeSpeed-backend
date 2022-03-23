import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have name"],
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "user must have email"],
    profile: String,
  },
  UID: {
    unique: true,
    type: String,
    required: [true, "user must have UID"],
  },
  image: {
    type: String,
    // required: [true, "user must have image"]
  },
  score: {
    type: Number,
    required: [true, "user must have score"],
  },
});
const userInfo = mongoose.model("User", userSchema);

export default userInfo;
