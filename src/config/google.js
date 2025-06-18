import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.CALLBACK_URL
},
  async function(accessToken,refreshToken,profile,cb){
    try {
      let user =await User.findOne({googleId:profile.id});
      if(!user){
        user = await User.create({
          googleId:profile.id,
          fullName:profile.displayName,
          email:profile.emails[0].value,
          isVerified:true
        })
      }
      const token = generateToken(user)
      cb(null,{user,token})
    } catch (error) {
      cb(error,null)
    }
  }
))