import { Cloud, Search, MapPin } from "lucide-react";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;

export function Header({ onCityChange }) {
  const [city, setCity] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            );
            const data = await response.json();
            console.log("Geocode response:", data);

            if (data.results && data.results.length > 0) {
              const location = data.results[0].components;
              const cityName =
                location.city ||
                location.town ||
                location.village ||
                location.state ||
                location.state_district ||
                "Unknown Location";

              setCity(cityName);
              onCityChange(cityName);
            } else {
              console.error("City not found");
            }
          } catch (error) {
            console.error("Error fetching city:", error);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      onCityChange(city.trim());
    }
  };

  return (
    <header className="w-full px-4 py-4 backdrop-blur-md border-b border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Cloud className="h-10 w-10 text-blue-700" />
          <h1 className="text-white text-3xl font-bold">CloudCast</h1>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full px-4 py-2 rounded-full bg-white/20 border border-white/30 
                       text-white placeholder-white/70 focus:outline-none focus:ring-2 
                       focus:ring-white/50"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
        </div>

        {/* Current Location Button */}
      </div>
    </header>
  );
}
