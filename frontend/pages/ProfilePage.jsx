import React from "react";
import { FaEnvelope, FaPhone, FaUserEdit, FaCamera, FaArrowLeft } from "react-icons/fa";

export default function ManageProfile() {
  const user = {
    name: "Kim Lee",
    email: "KimLee@gmail.com",
    phone: "+7 (955) 123-4567",
  };

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#4caf50", // Entire page green background
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff", // White info box
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        {/* Profile Heading */}
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.25rem", color: "#222" }}>
          Profile
        </h1>

        {/* Subheading */}
        <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "#555" }}>
          Manage your personal information
        </p>

        <h3 style={{ marginBottom: "1.5rem", fontSize: "1.3rem", fontWeight: "600" }}>
          Personal Information
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Avatar */}
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#555",
                userSelect: "none",
              }}
            >
              {getInitials(user.name)}
            </div>
            <FaCamera
              style={{
                position: "absolute",
                bottom: "-4px",
                right: "-4px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "6px",
                fontSize: "0.8rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                cursor: "pointer",
                color: "#4caf50",
              }}
              title="Change profile picture"
            />
          </div>

          {/* User Info */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
              <FaUserEdit style={{ marginRight: "0.5rem", color: "#666" }} />
              <strong style={{ width: "90px" }}>Name:</strong> {user.name}
            </div>
            <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
              <FaEnvelope style={{ marginRight: "0.5rem", color: "#666" }} />
              <strong style={{ width: "90px" }}>Email:</strong> {user.email}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaPhone style={{ marginRight: "0.5rem", color: "#666" }} />
              <strong style={{ width: "90px" }}>Phone:</strong> {user.phone}
            </div>
          </div>
        </div>

        <button
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4caf50",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
          type="button"
        >
          <FaUserEdit />
          Edit Profile
        </button>

        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "transparent",
            border: "none",
            color: "#4caf50",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1rem",
          }}
          type="button"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    </div>
  );
}
