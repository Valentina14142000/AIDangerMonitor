import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaPen, FaUserCircle } from "react-icons/fa";

export default function UserProfile({ user, onLogout, onEdit, isEditing }) {
  const [showPassword, setShowPassword] = useState(false);

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  const sectionStyle = {
    background: "rgba(255,255,255,0.15)",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "0.25rem",
    fontSize: "0.9rem",
    opacity: 0.85,
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
        padding: "2rem",
        borderRadius: "16px",
        color: "white",
        maxWidth: "400px",
        margin: "2rem auto",
        boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Profile Icon */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <FaUserCircle size={64} />
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "0.5rem" }}>
          {getInitials(user.username)}
        </div>
      </div>

      {/* Username */}
      <div>
        <label style={labelStyle}>Username</label>
        <div style={sectionStyle}>
          <span>{user.username || "N/A"}</span>
          {isEditing && (
            <FaPen
              style={{ cursor: "pointer" }}
              onClick={() => onEdit?.("username")}
              title="Edit Username"
            />
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email</label>
        <div style={sectionStyle}>
          <span>{user.email || "N/A"}</span>
          {isEditing && (
            <FaPen
              style={{ cursor: "pointer" }}
              onClick={() => onEdit?.("email")}
              title="Edit Email"
            />
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label style={labelStyle}>Phone Number</label>
        <div style={sectionStyle}>
          <span>{user.phoneNumber || "N/A"}</span>
          {isEditing && (
            <FaPen
              style={{ cursor: "pointer" }}
              onClick={() => onEdit?.("phoneNumber")}
              title="Edit Phone Number"
            />
          )}
        </div>
      </div>

      {/* Logout button (optional) */}
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            marginTop: "1.5rem",
            background: "#ff4d4f",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#d9363e")}
          onMouseOut={(e) => (e.target.style.background = "#ff4d4f")}
        >
          Logout
        </button>
      )}
    </div>
  );
}
