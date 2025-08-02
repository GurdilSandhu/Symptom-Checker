import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import appointmentRoutes from "./routes/appointment.js";
import symptomRoutes from "./routes/symptomRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware to log incoming origin header
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

// CORS middleware
app.use(cors({
  origin: [
    "https://symptom-checker-frontend-2j9n.onrender.com",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/symptoms", symptomRoutes);


app.get("/", (req, res) => res.send("🚀 Deployed: CORS test updated!"));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
