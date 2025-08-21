import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from '../config/mongodb.js';
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js';
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Listening to Port 3000"))

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);