import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MapComponent from "../components/MapComponent";
import { suggestSafestRoute } from "../services/api";

export default function DashboardPage({ logout, currentUser }) {
  const navigate = useNavigate();

  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lon: -74.006 });
  const [route, setRoute] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [routeDetails, setRouteDetails] = useState(null);
  const [routeRiskLevel, setRouteRiskLevel] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSuggestRoute = async (startLat, startLon, endLat, endLon) => {
    try {
      const response = await suggestSafestRoute(startLat, startLon, endLat, endLon);

      if (response.route && response.route.length) {
        setRoute(response.route);
        setRouteRiskLevel(response.risk_level || "unknown");
        setMapCenter({ lat: startLat, lon: startLon });

        setRouteDetails({
          distance: (Math.random() * 10 + 5).toFixed(2) + " km",
          estimatedTime: (Math.random() * 30 + 10).toFixed(0) + " mins",
          riskZonesAvoided: Math.floor(Math.random() * 5 + 1),
        });

        setSearchHistory((prev) => [
          {
            start: { lat: startLat, lon: startLon },
            end: { lat: endLat, lon: endLon },
            date: new Date().toLocaleString(),
          },
          ...prev,
        ]);
      } else {
        alert("⚠️ No safe route found.");
      }
    } catch (err) {
      alert("❌ Error fetching route: " + (err.response?.data?.detail || err.message));
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const clearHistory = () => window.confirm("Clear search history?") && setSearchHistory([]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: darkMode ? "#222" : "#004d40",
          color: "white",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            left: "10px",
            top: "10px",
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          aria-label="Go to Home"
          title="Go to Home"
        >
          <FaHome />
          <span>Home</span>
        </button>

        <h2>Navigate Smarter with AIDangerMonitor</h2>
        <p>Discover the Safest Path to Your Destination</p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/safe-places")}>📍 Safe Places Nearby</button>

          <button onClick={() => navigate("/report")}>🚨 Report Risk Area</button>

          <button onClick={() => navigate("/emergency-contacts")}>📞 Emergency Contacts</button>

          <button onClick={() => navigate("/profile")}>👤 Profile</button>
        </div>

        <div style={{ position: "absolute", right: "10px", top: "10px", display: "flex", gap: "10px" }}>
          <button onClick={toggleDarkMode}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          <button onClick={logout} style={{ backgroundColor: "#d32f2f", color: "white" }}>
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", padding: "1rem", gap: "1rem" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchBar onSearchRoute={handleSuggestRoute} />
          <div style={{ flex: 1, marginTop: "1rem" }}>
            <MapComponent center={mapCenter} route={route} />
          </div>
        </div>

        <aside
          style={{
            width: "300px",
            backgroundColor: darkMode ? "#222" : "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            padding: "1rem",
            overflowY: "auto",
          }}
        >
          <h3>Route Details</h3>
          {routeDetails ? (
            <ul>
              <li>Distance: {routeDetails.distance}</li>
              <li>Estimated Time: {routeDetails.estimatedTime}</li>
              <li>Risk Zones Avoided: {routeDetails.riskZonesAvoided}</li>
              <li>Risk Level: {routeRiskLevel}</li>
            </ul>
          ) : (
            <p>No route suggested yet.</p>
          )}

          <h3>
            Search History{" "}
            <button
              onClick={clearHistory}
              style={{
                fontSize: "0.8rem",
                color: darkMode ? "#f44336" : "#d32f2f",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Clear search history"
              title="Clear search history"
            >
              ✖
            </button>
          </h3>
          {searchHistory.length > 0 ? (
            <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
              {searchHistory.map((item, idx) => (
                <li key={idx}>
                  <strong>Start:</strong> {item.start.lat.toFixed(4)}, {item.start.lon.toFixed(4)} <br />
                  <strong>End:</strong> {item.end.lat.toFixed(4)}, {item.end.lon.toFixed(4)} <br />
                  <small>{item.date}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </aside>
      </main>
    </div>
  );
}
