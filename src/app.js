import express from 'express';
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandler.js';
import { asyncHandler } from './utils/asyncHandler.js';
dotenv.config()

export const app = express();



app.use(errorHandler)