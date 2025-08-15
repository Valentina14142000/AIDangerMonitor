import React, { useState } from "react";

export default function SearchBar({ onSearchRoute }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // "start" or "end"
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    }
  };

  const handleInputChange = (value, field) => {
    if (field === "start") setStart(value);
    else setEnd(value);

    setActiveField(field);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (place) => {
    const coords = {
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    };

    if (activeField === "start") {
      setStart(place.display_name);
      setStartCoords(coords);
    } else {
      setEnd(place.display_name);
      setEndCoords(coords);
    }

    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!startCoords || !endCoords) {
      alert("Please select both start and destination from suggestions.");
      return;
    }

    onSearchRoute(startCoords, endCoords);
  };

  return (
    <div className="mb-4 w-full">
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <input
          type="text"
          value={start}
          onChange={(e) => handleInputChange(e.target.value, "start")}
          placeholder="Start location"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={end}
          onChange={(e) => handleInputChange(e.target.value, "end")}
          placeholder="Destination"
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Go
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow-md max-h-48 overflow-auto">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
