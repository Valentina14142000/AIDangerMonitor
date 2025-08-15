import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { suggestSafestRoute, reportRiskArea } from "../services/api";

export default function DashboardPage() {
  const [mapCenter, setMapCenter] = useState({ lat: 55.751574, lon: 37.573856 }); // Moscow default
  const [route, setRoute] = useState([]);
  const [routeRiskLevel, setRouteRiskLevel] = useState("");
  const [message, setMessage] = useState("");

  // User clicks to suggest a route
  const handleSuggestRoute = async () => {
    const start = prompt("Enter start location (lat,lon):", `${mapCenter.lat},${mapCenter.lon}`);
    const end = prompt("Enter destination location (lat,lon):");
    if (!start || !end) {
      alert("Start and destination required");
      return;
    }

    const [startLat, startLon] = start.split(",").map(Number);
    const [endLat, endLon] = end.split(",").map(Number);

    setMessage("Fetching safest route...");
    const response = await suggestSafestRoute(startLat, startLon, endLat, endLon);
    if (response.route.length) {
      setRoute(response.route);
      setRouteRiskLevel(response.risk_level);
      setMapCenter({ lat: startLat, lon: startLon });
      setMessage(`Route found with risk level: ${response.risk_level}`);
    } else {
      setMessage("No safe route found.");
    }
  };

  // User clicks on map to report risk
  const handleReportRisk = async (coords) => {
    if (!window.confirm(`Report risk area at ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}?`)) return;
    try {
      await reportRiskArea(coords);
      alert("Risk area reported successfully.");
    } catch {
      alert("Failed to report risk area.");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
        <button onClick={handleSuggestRoute} style={{ marginRight: 10 }}>
          Suggest Safest Route
        </button>
        <div style={{ marginTop: 8, fontWeight: "bold" }}>{message}</div>
        {routeRiskLevel && <div>Route Risk Level: {routeRiskLevel}</div>}
      </div>

      <MapComponent
        center={mapCenter}
        route={route}
        setMapCenter={setMapCenter}
        onMapClick={handleReportRisk}
      />
    </div>
  );
}
