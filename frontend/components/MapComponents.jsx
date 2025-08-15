import React from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents, Marker, Popup } from 'react-leaflet';
import StartMarker from './StartMarker';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ center, route, riskLevel, distance, duration, onMapClick, selectedPoint }) {
  // Provide a default center if none is passed
  const centerPosition = center && center.lat && center.lon
    ? [center.lat, center.lon]
    : [51.505, -0.09]; // Default to London or any fallback coords

  const routePositions = Array.isArray(route) ? route.map(point => [point.lat, point.lon]) : [];

  // Custom component to handle clicks on map
  function ClickHandler() {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          onMapClick(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  }

  return (
    <MapContainer center={centerPosition} zoom={12} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {/* Handle map clicks */}
      <ClickHandler />

      {/* Show starting marker if center is defined */}
      {center && (
        <StartMarker
          position={centerPosition}
          riskLevel={riskLevel}
          distance={distance}
          duration={duration}
        />
      )}

      {/* Show selectedPoint marker */}
      {selectedPoint && (
        <Marker position={[selectedPoint.lat, selectedPoint.lon]}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}

      {routePositions.length > 0 && (
        <Polyline positions={routePositions} pathOptions={{ color: 'blue', weight: 4 }} />
      )}
    </MapContainer>
  );
}
