import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MapComponent from "../components/MapComponent";
import { fetchNearbySafePlaces } from "../services/api";

export default function SafePlacesPage() {
  const navigate = useNavigate();
  const [safePlaces, setSafePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lon: -74.006 }); // Default to NYC

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setMapCenter({ lat: latitude, lon: longitude });

          try {
            const response = await fetchNearbySafePlaces(latitude, longitude);
            setSafePlaces(response.data);
          } catch (err) {
            alert("❌ Failed to fetch safe places: " + err.message);
          } finally {
            setLoading(false);
          }
        },
        () => {
          alert("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          background: "transparent",
          border: "none",
          color: "#004d40",
          cursor: "pointer",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <FaArrowLeft /> Back
      </button>

      <h2>📍 Safe Places Nearby</h2>

      {loading ? (
        <p>Loading nearby safe places...</p>
      ) : safePlaces.length ? (
        <div>
          <MapComponent center={mapCenter} safePlaces={safePlaces} />
          <ul>
            {safePlaces.map((place, idx) => (
              <li key={idx}>
                <strong>{place.name}</strong> — {place.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No safe places found nearby.</p>
      )}
    </div>
  );
}
