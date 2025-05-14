import { useState, useContext } from "react";
import { loginUser } from "../services/api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";  // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State for error message
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    try {
      const data = await loginUser({ email, password });
      if (data && data.token) {  // Check for valid token or user data
        login(data);
        navigate("/AfterLogin");
      } else {
        setError("Invalid email or password. Try again.");  // Set error message
      }
    } catch (error) {
      setError("Invalid email or password. Try again.");  // Set error on catch block
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}  {/* Display error message */}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
