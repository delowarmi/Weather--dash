import React, { useState, useEffect } from "react";
import axios from "axios";

let API_KEY = "0a38cb64368da2ede09ed15fd1eb232b"; // 
let BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let WeatherDashboard = () => {
  let [cities, setCities] = useState(() => JSON.parse(localStorage.getItem("cities")) || []);
  let [unit, setUnit] = useState("metric"); // 
  let [cityInput, setCityInput] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  let addCity = async () => {
    if (cityInput && !cities.some((c) => c.name.toLowerCase() === cityInput.toLowerCase())) {
      try {
        let response = await axios.get(`${BASE_URL}?q=${cityInput}&units=${unit}&appid=${API_KEY}`);
        let newCity = {
          name: response.data.name,
          temperature: response.data.main.temp,
          condition: response.data.weather[0].main,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
        };
        setCities([...cities, newCity]);
        setCityInput("");
      } catch (error) {
        alert("City not found");
      }
    }
  };

  let removeCity = (cityName) => {
    setCities(cities.filter((c) => c.name !== cityName));
  };

  let toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
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
          <button onClick={toggleUnit} className="bg-gray-500 text-white px-4 py-2 rounded">{unit === "metric" ? "C" : "F"}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.length === 0 ? (
            <p className="text-center">No cities added</p>
          ) : (
            cities.map((city) => (
              <div key={city.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{city.name}</h2>
                  <button onClick={() => removeCity(city.name)} className="text-red-500">Remove</button>
                </div>
                <p>Temperature: {city.temperature}°{unit === "metric" ? "C" : "F"}</p>
                <p>Condition: {city.condition}</p>
                <p>Humidity: {city.humidity}%</p>
                <p>Wind Speed: {city.windSpeed} {unit === "metric" ? "km/h" : "mph"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
