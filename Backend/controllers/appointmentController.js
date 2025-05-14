import Appointment from "../models/Appointment.js";

// 🔹 Book an Appointment
export const bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;

  try {
    const newAppointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time,
      status: "pending",
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔹 Get Appointments for Logged-in User
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
