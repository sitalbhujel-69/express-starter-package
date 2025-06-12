import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt.js";

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.CALLBACK_URL
},
  async function(accessToken,refreshToken,profile,cb){
    try {
      //logic for user creation in db
      const token = generateToken()
      cb(null,{profile,token})
    } catch (error) {
      cb(error,null)
    }
  }
))