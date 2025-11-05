import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "https://expense-tracker-gules-zeta.vercel.app"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// API Routes
app.use("/api/expenses", expenseRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
