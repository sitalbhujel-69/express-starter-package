import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import { errorHandler } from './middlewares/errorHandler.js';
import './config/google.js'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { protectedAuth } from './middlewares/protected.js';

export const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static('uploads'))

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

app.get('/logout',protectedAuth,(req,res)=>{
  req.clearCookie('token',{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
  })
  res.json({message:'user logged out successfully'})
})


//error middleware
app.use(errorHandler)