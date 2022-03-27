import mongoose from "mongoose";

export interface use{
   name: string;
   email: string;
   UID: string;
   image: string;
   score:number;
   _id:string;
}


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
    default:0
  },
});
const userInfo = mongoose.model<use>("User", userSchema);

export default userInfo;
