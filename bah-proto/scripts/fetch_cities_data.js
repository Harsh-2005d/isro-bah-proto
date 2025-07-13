// scripts/fetch_cities_pm.js
import fs from "fs";
import { fetchWeatherApi } from "openmeteo";

const url = "https://air-quality-api.open-meteo.com/v1/air-quality";

const majorCities = [
  { name: "Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Bhopal", lat: 23.2599, lon: 77.4126 },
];

const fetchCityData = async () => {
  const results = [];

  for (const city of majorCities) {
    const params = {
      latitude: city.lat,
      longitude: city.lon,
      daily: ["pm10", "pm2_5"],
      timezone: "Asia/Kolkata",
      domains: "cams_global",
    };

    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const daily = response.daily();

      const pm10 = daily.variables(0).valuesArray()[0];
      const pm25 = daily.variables(1).valuesArray()[0];

      results.push({ ...city, pm10, pm25 });
      console.log(`✓ ${city.name}: PM2.5=${pm25}, PM10=${pm10}`);
    } catch (err) {
      console.warn(`✗ ${city.name} fetch failed:`, err.message || err);
    }

    await new Promise((r) => setTimeout(r, 200)); // polite throttling
  }

  fs.writeFileSync("public/city_pm_data.json", JSON.stringify(results, null, 2));
  console.log("✅ Data saved to public/city_pm_data.json");
};

fetchCityData();
