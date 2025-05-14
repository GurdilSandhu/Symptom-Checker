import express from "express";
import { bookAppointment, getAppointments } from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/my-appointments", protect, getAppointments);

export default router;
