
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function StartMarker({ position, riskLevel, distance, duration }) {
  return (
    <Marker position={position}>
      <Popup>
        Start Point<br />
        Risk: {riskLevel}<br />
        Distance: {distance?.toFixed(2)} km<br />
        Duration: {duration?.toFixed(1)} min
      </Popup>
    </Marker>
  );
}
