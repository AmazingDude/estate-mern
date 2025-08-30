import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

connectDB();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// serve static files
app.use(express.static(path.join(__dirname, "/client/dist")));

// catch all for React Router
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => console.log("Listening to Port 3000"));
