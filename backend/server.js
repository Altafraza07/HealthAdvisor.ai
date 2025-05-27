import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import geminiRoute from './routes/geminiRoute.js';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: "https://healthadvisor-ai.onrender.com/",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use('/api', geminiRoute);

// Serve static frontend
app.use(express.static(join(__dirname, "..", "frontend", "dist")));


// Catch all route using regex for Express v5
app.get(/.*/, (req, res) => {
  res.sendFile(resolve(__dirname,"..", "frontend", "dist", "index.html"));
});

// Connect MongoDB and start server
const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
