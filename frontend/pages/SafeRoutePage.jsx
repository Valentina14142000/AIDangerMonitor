import { useEffect, useState } from "react";
import { suggestSafestRoute } from "../services/api"; // use the service import
import MapComponent from "../components/MapComponent";

export default function SafeRoutePage() {
  const [routeData, setRouteData] = useState(null);
  const start = { lat: 40.7128, lon: -74.0060 };
  const end = { lat: 40.730610, lon: -73.935242 };

  useEffect(() => {
    async function fetchRoute() {
      try {
        const data = await suggestSafestRoute(start.lat, start.lon, end.lat, end.lon);
        setRouteData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRoute();
  }, []);

  if (!routeData) return <div>Loading route...</div>;

  return (
    <div>
      <h2>Suggested Route</h2>
      <p>Risk level: {routeData.risk_level}</p>
      <MapComponent center={start} route={routeData.route} />
    </div>
  );
}
