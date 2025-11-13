import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

// ✅ Updated CORS with your correct Vercel domain
// flexible, safe CORS allowing your Vercel domain(s) + localhost
const allowedOrigins = [
  "https://expense-tracker-kfss90uhe-dashwanth04s-projects.vercel.app",
  "https://expense-tracker-1bigqd888-dashwanth04s-projects.vercel.app",
  "https://expense-tracker-gules-zeta.vercel.app",
  "https://expense-tracker-kfss90uhe-dashwanth04s-projects.vercel.app",
  // add any other exact Vercel URLs you use
  "http://localhost:4200"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin) {
    // allow non-browser requests (curl, Postman) too
    return next();
  }

  // allow exact matches or any Vercel project under vercel.app if you prefer
  if (
    allowedOrigins.includes(origin) ||
    origin.endsWith(".vercel.app")
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // handle preflight
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    return next();
  } else {
    return res.status(403).json({ message: "CORS blocked for origin: " + origin });
  }
});


app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// API Routes
app.use("/api/expenses", expenseRoutes);

// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
