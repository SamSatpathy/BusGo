import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("All Field are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        setError("User already exists or Server Error");
        return;
      }
      navigate("/login");
    } catch (error) {
      setError("Server not running");
    }
  };

  return (
    <div className="auth-container-1">
      <form onSubmit={handleRegister} className="auth-card">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}

        <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
        <input className="auth-input" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <div className="password-row">
          <input className="auth-input" value={password} type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
          </button>
        </div>

        <div className="password-row">
          <input className="auth-input" value={confirmPassword} type={showConfirmPassword ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            <i className={showConfirmPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
          </button>
        </div>

        <button type="submit" className="auth-button">Register</button>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;