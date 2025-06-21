import { Cloud, Search, MapPin } from "lucide-react";
import { useState } from "react";

export function Header({ onCityChange }) {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    if (newCity.trim() === "") {
      onCityChange("Delhi"); // Reset to default
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      const formattedCity =
        city.trim().charAt(0).toUpperCase() +
        city.trim().slice(1).toLowerCase();
      onCityChange(formattedCity);
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
            placeholder="Search..."
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
