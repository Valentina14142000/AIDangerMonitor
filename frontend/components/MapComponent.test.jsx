import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ center, route = [], riskLevel, distance, duration }) {
  const mapCenter = [center.lat, center.lon];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Start point marker */}
        <Marker position={mapCenter}>
          <Popup>Start Point</Popup>
        </Marker>

        {/* Route line + end marker if route exists */}
        {route.length > 1 && (
          <>
            <Polyline positions={route.map((p) => [p.lat, p.lon])} color="blue" />
            <Marker position={[route[route.length - 1].lat, route[route.length - 1].lon]}>
              <Popup>End Point</Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {/* Info box */}
      <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <p>
          <strong>Risk:</strong> {riskLevel || 'Unknown'}
        </p>
        {distance && (
          <p>
            <strong>Distance:</strong> {distance.toFixed(1)} km
          </p>
        )}
        {duration && (
          <p>
            <strong>Duration:</strong> {duration.toFixed(0)} min
          </p>
        )}
      </div>
    </div>
  );
}
