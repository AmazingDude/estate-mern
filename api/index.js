import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)

const app = express();

app.listen(3000, () => console.log("Listening to Port 3000"))