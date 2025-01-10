import { Cloud, Search, MapPin } from "lucide-react";
import { useState } from "react";
const API_KEY = "8c9cc553111e463dbce3e47a856a386b";
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
            console.log(data);
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
              onCityChange(cityName); // Notify parent component
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
    onCityChange(newCity); // Notify parent component when the input changes
  };
  return (
    <header className="max-w-10xl shadow-md px-4 py-4 backdrop-blur-md h-20">
      <div className="flex items-center justify-between mx-auto ">
        {/* logo + heading */}
        <div className="flex items-center space-x-3">
          <Cloud className="h-10 w-10 text-blue-700" />
          <h1 className="text-white text-3xl font-bold">CloudCast</h1>
        </div>

        {/* searchbar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full px-4 py-2 rounded-full bg-white/20 border border-white/30 
                           text-black placeholder-white/70 focus:outline-none focus:ring-2 
                           focus:ring-white/50"
              value={city}
              onChange={handleInputChange}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-white/30 hover:bg-white/70 rounded-full px-4 py-2 ">
          <MapPin className="h-7 w-7 text-black" />
          <span className="text-2xl font-bold" onClick={getLocation}>
            Current Location
          </span>
        </button>
      </div>
    </header>
  );
}
