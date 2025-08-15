import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { username, email, password } = form;
      await API.post("/auth/register", { username, email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(
        "Registration failed: " +
          (err.response?.data?.detail || "Unknown error")
      );
    }
  };

  const colors = {
    primary: "#00aaff",
    inputBorder: "#ccc",
    buttonBg: "green",
    buttonText: "white",
    frameBorder: "rgba(0, 0, 0, 0.15)",
    shadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    iconColor: "gray",
  };

  const containerStyle = {
    width: "360px",
    padding: "30px 25px",
    borderRadius: "10px",
    border: `1px solid ${colors.frameBorder}`,
    boxShadow: colors.shadow,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headingWrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "25px",
    userSelect: "none",
  };

  const headingStyle = {
    fontWeight: "600",
    fontSize: "28px",
    color: "#222",
    margin: 0,
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "12px 15px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "5px",
    border: `1px solid ${colors.inputBorder}`,
    outline: "none",
    boxSizing: "border-box",
  };

  const passwordWrapperStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
  };

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: "45px", // space for eye icon
    flex: 1,
  };

  const eyeButtonStyle = {
    position: "absolute",
    right: "12px",
    background: "transparent",
    border: "none",
    color: colors.iconColor,
    cursor: "pointer",
    fontSize: "18px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    top: 0,
  };

  const registerButtonStyle = {
    padding: "12px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: colors.buttonBg,
    color: colors.buttonText,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        color: "white",
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <div style={containerStyle}>
        {/* Heading with Lock Icon */}
        <div style={headingWrapperStyle}>
          <FaLock color="green" size={28} />
          <h2 style={headingStyle}>Register</h2>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />

        <div style={passwordWrapperStyle}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={passwordInputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={eyeButtonStyle}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div style={passwordWrapperStyle}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            style={passwordInputStyle}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={eyeButtonStyle}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button onClick={handleRegister} style={registerButtonStyle}>
          Register
        </button>
      </div>
    </div>
  );
}
