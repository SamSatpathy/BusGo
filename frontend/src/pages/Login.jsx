import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "./Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // AXIOS - no localhost, no fetch
      const { data } = await api.post("/login", { email, password });

      // SAVE TOKEN - THIS WAS MISSING
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({ type: "LOGIN", payload: data.user });
      navigate("/");
    } catch (err) {
      // axios error
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container-2">
      <form onSubmit={handleLogin} className="auth-card">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}

        <input
          className="auth-input"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="password-row">
          <input
            className="auth-input"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
          </button>
        </div>

        <button type="submit" className="auth-button">Login</button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;