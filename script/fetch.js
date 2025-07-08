// scripts/fetchPMData.js
import fs from "fs";
import { fetchWeatherApi } from "openmeteo";

// India grid (1x1 degree)
const latStart = 6, latEnd = 37;
const lonStart = 68, lonEnd = 97;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchGridData() {
  const allResults = [];

  for (let lat = latStart; lat <= latEnd; lat++) {
    for (let lon = lonStart; lon <= lonEnd; lon++) {
      const params = {
        latitude: lat,
        longitude: lon,
        hourly: ["pm10", "pm2_5"],
        timezone: "Asia/Kolkata",
        domains: "cams_global"
      };

      try {
        const responses = await fetchWeatherApi("https://air-quality-api.open-meteo.com/v1/air-quality", params);
        const response = responses[0];
        const hourly = response.hourly();

        const pm10 = hourly.variables(0)?.valuesArray()?.[0];
        const pm25 = hourly.variables(1)?.valuesArray()?.[0];

        if (pm10 != null && pm25 != null) {
          allResults.push({ lat, lon, pm10, pm25 });
          console.log(`✓ ${lat},${lon} -> PM10: ${pm10}, PM2.5: ${pm25}`);
        } else {
          console.warn(`⚠️ Skipped ${lat},${lon}: Missing data`);
        }
      } catch (err) {
        console.error(`✗ ${lat},${lon} -> Error:`, err.message || err);
      }

      await delay(100); // polite delay to avoid throttling
    }
  }

  // Save to file
  fs.writeFileSync("public/pm_grid_data.json", JSON.stringify(allResults, null, 2));
  console.log("✅ Saved to public/pm_grid_data.json");
}

fetchGridData();
