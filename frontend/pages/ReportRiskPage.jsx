import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { reportRiskArea } from "../services/api";

export default function ReportRiskPage() {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [description, setDescription] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // Get user’s current location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Failed to get user location:", error);
          setUserLocation({ lat: 51.505, lon: -0.09 }); // London fallback
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      setUserLocation({ lat: 51.505, lon: -0.09 }); // fallback
    }
  }, []);

  const handleMapClick = (lat, lon) => {
    setSelectedPoint({ lat, lon });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPoint) {
      alert("⚠️ Please select a location on the map.");
      return;
    }
    try {
      await reportRiskArea({
        lat: selectedPoint.lat,
        lon: selectedPoint.lon,
        description,
      });
      alert("🚨 Risk area reported successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to report risk: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#4caf50", // green background
        padding: "2rem",
        color: "#fff", // white text for contrast
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2>🚨 Report a Risk Area</h2>
      <p>Click on the map to select the location you want to report as risky</p>

      <div
        style={{
          height: "400px",
          marginBottom: "1rem",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        }}
      >
        {userLocation ? (
          <MapComponent
            center={userLocation}
            onMapClick={handleMapClick}
            selectedPoint={selectedPoint}
          />
        ) : (
          <p>📍 Loading your location...</p>
        )}
      </div>

      {selectedPoint && (
        <p>
          Selected Location: {selectedPoint.lat.toFixed(4)}, {selectedPoint.lon.toFixed(4)}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Crime Description:<br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "none",
                resize: "vertical",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Risk Report
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{
            marginLeft: "1rem",
            padding: "0.75rem 1.5rem",
            border: "1px solid #fff",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
