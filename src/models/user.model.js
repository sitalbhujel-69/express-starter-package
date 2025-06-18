import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
  },
  googleId:{
    type:String,
    unique:true,
    sparse:true
  },
  isVerified:{
    type:Boolean,
    default:false
  }
})

export const User = mongoose.model("User",userSchema);