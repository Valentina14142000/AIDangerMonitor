import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const LogInPage = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token);
        navigate("/dashboard");
      } else {
        setError(data.detail || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  // Define reusable style variables
  const colors = {
    primary: "#00aaff",
    background: "#fff",
    inputBorder: "#ccc",
    buttonBg: "green",
    buttonText: "#fff",
    errorText: "red",
    iconColor: "gray",
    frameBorder: "rgba(0, 0, 0, 0.15)",
    shadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  };

  const styles = {
    container: {
      color: "#333",
      background: colors.background,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    frameContainer: {
      width: "360px",
      padding: "30px 25px",
      borderRadius: "10px",
      border: `1px solid ${colors.frameBorder}`,
      boxShadow: colors.shadow,
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    headingWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
      userSelect: "none",
    },
    heading: {
      fontWeight: "600",
      fontSize: "28px",
      color: "#222",
      margin: 0,
    },
    formWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "12px 15px",
      fontSize: "16px",
      borderRadius: "5px",
      border: `1px solid ${colors.inputBorder}`,
      outline: "none",
      transition: "border-color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
    passwordWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    passwordInput: {
      padding: "12px 45px 12px 15px",
      fontSize: "16px",
      borderRadius: "5px",
      border: `1px solid ${colors.inputBorder}`,
      outline: "none",
      flex: 1,
      transition: "border-color 0.3s ease",
    },
    toggleButton: {
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
    },
    submitButton: {
      padding: "12px",
      backgroundColor: colors.buttonBg,
      color: colors.buttonText,
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
      userSelect: "none",
      width: "100%",
    },
    submitButtonDisabled: {
      backgroundColor: "#4caf50",
      cursor: "not-allowed",
    },
    errorText: {
      color: colors.errorText,
      marginTop: "10px",
      fontWeight: "500",
      textAlign: "center",
    },
    forgotPasswordWrapper: {
      marginTop: "10px",
      textAlign: "center",
    },
    forgotPasswordLink: {
      color: colors.primary,
      textDecoration: "none",
      fontWeight: "500",
      userSelect: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.frameContainer}>
        {/* Heading with Lock Icon */}
        <div style={styles.headingWrapper}>
          <FaLock color="green" size={28} />
          <h2 style={styles.heading}>Login</h2>
        </div>

        <form onSubmit={handleLogin} style={styles.formWrapper}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.inputBorder)}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.passwordInput}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.inputBorder)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {}),
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={styles.errorText}>{error}</p>}

          <div style={styles.forgotPasswordWrapper}>
            <Link to="/forgot-password" style={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
