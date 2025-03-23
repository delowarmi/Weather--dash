
import React, { useState, useEffect } from "react";

const WeatherDashboard = () => {
  const [cities, setCities] = useState(() => JSON.parse(localStorage.getItem("cities")) || []);
  const [unit, setUnit] = useState("C");
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const addCity = () => {
    if (cityInput && !cities.includes(cityInput)) {
      setCities([...cities, cityInput]);
      setCityInput("");
    }
  };

  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const simulateWeatherData = (city) => {
    return {
      temperature: unit === "C" ? 25 : 77,
      condition: "Sunny",
      humidity: 60,
      windSpeed: 10,
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Add city"
            className="p-2 border rounded w-full text-black"
          />
          <button onClick={addCity} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          <button onClick={toggleUnit} className="bg-gray-500 text-white px-4 py-2 rounded">{unit}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.length === 0 ? (
            <p className="text-center">No cities added</p>
          ) : (
            cities.map((city) => {
              const weather = simulateWeatherData(city);
              return (
                <div key={city} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{city}</h2>
                    <button onClick={() => removeCity(city)} className="text-red-500">Remove</button>
                  </div>
                  <p>Temperature: {weather.temperature}°{unit}</p>
                  <p>Condition: {weather.condition}</p>
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind Speed: {weather.windSpeed} km/h</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;

