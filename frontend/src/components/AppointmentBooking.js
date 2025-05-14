import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import API from "../services/axiosInstance"; 
import "../styles/AppointmentBooking.css";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments/book", formData);
      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (error) {
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="appointment-container">
      <h4 className="devlopment">Still in Devlopment Process!!</h4>
      <h2>Book Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctor"
          placeholder="Doctor's Name"
          value={formData.doctor}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;



