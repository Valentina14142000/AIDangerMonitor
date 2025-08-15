import React from "react";
import MapComponent from "../components/MapComponent";

export default function MapPage() {
  const mockCenter = { lat: 51.5155, lon: -0.0922 };
  const mockRoute = [
    { lat: 51.5155, lon: -0.0922 },
    { lat: 51.5200, lon: -0.1000 },
    { lat: 51.5250, lon: -0.1100 }
  ];
  const mockRiskLevel = "Low";
  const mockDistance = 3.5; // km
  const mockDuration = 12;  // min

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2>Safe Route Map</h2>
      <MapComponent
        center={mockCenter}
        route={mockRoute}
        riskLevel={mockRiskLevel}
        distance={mockDistance}
        duration={mockDuration}
      />
    </div>
  );
}
