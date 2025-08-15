import axios from 'axios';

// Base Axios instance
export const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

export const getRiskLevel = async (lat, lon) => {
  try {
    const date = new Date();
    const { data } = await API.post('/api/predict', {
      latitude: lat,
      longitude: lon,
      hour_of_day: date.getHours(),
      day_of_week: date.getDay(),
    });
    return data.prediction?.toLowerCase() || 'unknown';
  } catch (error) {
    console.error('Risk assessment failed:', error);
    return 'error';
  }
};

export const suggestSafestRoute = async (startLat, startLon, endLat, endLon) => {
  try {
    const { data } = await API.post('/api/suggest-route', {
      start_lat: startLat,
      start_lon: startLon,
      end_lat: endLat,
      end_lon: endLon,
    });
    return {
      route: data.route || [],
      risk_level: data.risk_level || 'unknown',
    };
  } catch (error) {
    console.error('Route suggestion failed:', error);
    return { route: [], risk_level: 'error' };
  }
};

/**
 * Report a risk area by providing latitude, longitude, and optional description.
 * @param {{lat: number, lon: number, description?: string}} param0
 */
export const reportRiskArea = async ({ lat, lon, description }) => {
  try {
    const payload = { lat, lon };
    if (description) {
      payload.description = description;
    }
    const { data } = await API.post('/risk/report', payload);
    return data;
  } catch (error) {
    console.error('Risk reporting failed:', error);
    throw error;
  }
};

/**
 * Fetch nearby safe places.
 * @param {number} lat - Latitude of the current location.
 * @param {number} lon - Longitude of the current location.
 * @returns {Promise} - Axios response containing safe places.
 */
export async function fetchNearbySafePlaces(lat, lon) {
  try {
    const response = await API.get('/safe-places', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching safe places failed:', error);
    throw error;
  }
}
