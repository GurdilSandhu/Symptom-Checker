import { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/register.css"; // Importing external CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // Default role
  });

  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      console.log("Sending request:", formData); // Log request data
      const response = await registerUser(formData);
      console.log("Response from API:", response); // Log response
  
      if (response.message === "User already exists") {
        setError("User already exists! Please login.");
      } else if (response.message === "Registration successful") {
        setMessage("Registration Successful! Please Login.");
      } else {
        setError("Registration failed! Try again.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message); // Log error details
      setError(error.response?.data?.message || "Server error! Check console.");
    }
  };
  

  return (
    <div className="register-container">
      <h2>Create an Account</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Processing...</p>}

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange} className="register-select">
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
