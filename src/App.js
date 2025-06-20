import "./App.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [coordinates, setCoordinates] = useState(null);
  const handleCityChange = (newCity) => {
    if (typeof newCity === "object" && newCity.lat && newCity.lon) {
      setCoordinates(newCity);
      setCity("");
    } else {
      if (newCity.trim() === "") {
        setCity("Delhi");
        setCoordinates(null);
      } else {
        setCity(newCity);
        setCoordinates(null);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header onCityChange={handleCityChange} />
        <Content city={city} coordinates={coordinates} />
      </div>
    </>
  );
}

export default App;
