import dotenv from "dotenv";
dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRoutes from "./routes/todos.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
