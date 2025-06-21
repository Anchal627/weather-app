import {
  Droplet,
  Sun,
  SunriseIcon,
  SunsetIcon,
  Thermometer,
  ThermometerIcon,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

/* eslint-disable jsx-a11y/img-redundant-alt */
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export function Content({ city, coordinates }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let response = "";
        setLoading(true);
        if (coordinates && coordinates.lat && coordinates.lon) {
          const { lat, lon } = coordinates;
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        } else {
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        }
        const data = await response.json();
        console.log(data);
        if (data.cod !== 200) {
          <p className="text-2xl">Weather data not available.❌</p>;
        }
        // console.log(data);
        if (data.sys) {
          const sunriseTime = new Date(data.sys.sunrise * 1000);
          const sunsetTime = new Date(data.sys.sunset * 1000);
          setSunrise(sunriseTime);
          setSunset(sunsetTime);
        }

        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, coordinates]);

  const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    );
  }
  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const weather = weatherData.weather && weatherData.weather[0];
  const pressure = weatherData.main
    ? Math.round(weatherData.main.pressure)
    : "N/A";
  const temperature = weatherData.main
    ? Math.round(weatherData.main.temp)
    : "N/A";
  const humidity = weatherData.main ? weatherData.main.humidity : "N/A";
  const windSpeed = weatherData.wind
    ? Math.round(weatherData.wind.speed * 3.6)
    : "N/A";
  const formatTime = (time) => {
    if (!time) return "N/A";

    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };
  return (
    <>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8 max-w-xs mx-auto ">
          <h2 className="text-4xl font-bold text-white mb-2">
            {" "}
            {capitalize(city)}
          </h2>
          <p className="text-white/80 sm:text-base text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex-col items-center justify-center text-center">
              {weather ? (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                    alt={weather.description}
                    className="w-32 h-32 mx-auto mb-4"
                  />
                  <h3 className="text-6xl font-bold text-white mb-2">
                    {" "}
                    {temperature}°C
                  </h3>
                  <p className="text-xl text-white/80 capitalize">
                    {" "}
                    {weather.description}
                  </p>
                </>
              ) : (
                <p className="text-2xl">Weather data not available.❌</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <ThermometerIcon className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/70">Temperature</p>
                    <p className="text-xl font-semibold text-white">
                      {" "}
                      {temperature}°C
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Wind className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/70">Wind Speed</p>
                    <p className="text-xl font-semibold text-white">
                      {" "}
                      {windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Droplet className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/70">Humidity</p>
                    <p className="text-xl font-semibold text-white">
                      {humidity}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Thermometer className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/70">Pressure</p>
                    <p className="text-xl font-semibold text-white">
                      {pressure} hPa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <SunriseIcon className="h-8 w-8 text-white mx-auto" />
              <p className="text-white/70">Sunrise</p>
              <p className="text-xl font-semibold text-white">
                {" "}
                {formatTime(sunrise)}
              </p>
            </div>
            <div className="text-center">
              <SunsetIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <p className="text-white/70">Sunset</p>
              <p className="text-xl font-semibold text-white">
                {formatTime(sunset)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
