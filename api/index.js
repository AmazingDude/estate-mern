import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from '../config/mongodb.js';
import userRouter from "./routes/user.route.js";
dotenv.config();

connectDB();

const app = express();

app.listen(3000, () => console.log("Listening to Port 3000"))

app.get('/api/user', userRouter);