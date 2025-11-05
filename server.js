import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:4200",
  credentials: true
}));
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
