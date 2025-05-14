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

app.use(cors({
    origin: "http://localhost:3000", // ✅ Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Allow authentication headers
}));
app.use(express.json()); // ✅ Ensure JSON body parsing
app.use(express.urlencoded({ extended: true })); // ✅ Parse form data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use('/api/symptoms', symptomRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
