import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS FIX — Remove trailing slash in origin
app.use(
  cors({
    origin: [
      "https://expense-tracker-ny6n0lmw3-dashwanth04s-projects.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// API Routes
app.use("/api/expenses", expenseRoutes);

// ✅ FIX: Use correct environment variable name
mongoose
  .connect(process.env.MONGO_URI)   // <----- Corrected
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
