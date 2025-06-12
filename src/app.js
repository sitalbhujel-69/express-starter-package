import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import { errorHandler } from './middlewares/errorHandler.js';
import './config/google.js'
import cookieParser from 'cookie-parser';
import passport from 'passport';

export const app = express();
app.use(express.json());
app.use(cookieParser())

//initializing passport for oauth
app.use(passport.initialize())

//endpoints for Oauth
app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}))
app.get('/auth/google/callback',passport.authenticate('google',{
  failureRedirect:"/auth/google",
  session:false
}),
(req,res)=>{
  const {token} = req.user;
  res.cookie('token',token,{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
  })
  res.redirect('http://localhost:5173/home')
})

//error middleware
app.use(errorHandler)