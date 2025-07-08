import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 🔥 Heatmap Layer Component
const HeatmapLayer = ({ gridData, cityData, pollutant }) => {
  const map = useMap();

  useEffect(() => {
    if (!gridData || gridData.length === 0) return;

    const normalize = (val, min = 0, max = 150) => {
      const clamped = Math.max(min, Math.min(val, max));
      return (clamped - min) / (max - min);
    };

    const gridHeat = gridData.map((point) => [
      point.lat,
      point.lon,
      normalize((pollutant === "pm25" ? point.pm25 : point.pm10) * 2),
    ]);

    const cityHeat = cityData.map((city) => [
      city.lat,
      city.lon,
      normalize((pollutant === "pm25" ? city.pm25 : city.pm10) * 6),
    ]);

    const fullHeatData = [...gridHeat];

    const zoom = map.getZoom();
    const dynamicRadius = Math.max(50, Math.min(70, 7 * (9 - zoom)));

    const heatLayer = L.heatLayer(fullHeatData, {
      radius: dynamicRadius,
      blur: 30,
      maxZoom: 8,
      gradient: {
        0.2: "#0000ff",
        0.3: "#00ff00",
        0.4: "#ffff00",
        0.6: "#ff9900",
        0.8: "#ff0000",
      },
    }).addTo(map);
    const cityLayer = L.heatLayer(cityHeat, {
      radius: 60,
      blur: 10,
      maxZoom: 8,
      gradient: {
        0.0: "#0000ff",
        0.2: "#00ff00",
        0.4: "#ffff00",
        0.6: "#ff9900",
        0.8: "#ff0000",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
      map.removeLayer(cityLayer);
    };
  }, [gridData, cityData, pollutant, map]);

  return null;
};

const MapComponent = ({ pollutant, onCitySelect }) => {
  const [gridPM, setGridPM] = useState([]);
  const [cityPM, setCityPM] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gridRes, cityRes] = await Promise.all([
          fetch("/pm_grid_data_filtered.json"),
          fetch("/cities_pm_data.json"),
        ]);
        const [gridData, cityData] = await Promise.all([
          gridRes.json(),
          cityRes.json(),
        ]);

        setGridPM(gridData);
        setCityPM(cityData);
      } catch (err) {
        console.error("❌ Failed to load PM data:", err.message || err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <div className="relative ">
        <MapContainer
          center={[22.5, 80]}
          zoom={5}
          style={{ height: "calc(100vh - 80px)", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <HeatmapLayer
            gridData={gridPM}
            cityData={cityPM}
            pollutant={pollutant}
          />
          {onCitySelect != null &&
            cityPM.map((city, idx) => (
              <Marker
                key={idx}
                position={[city.lat, city.lon]}
                eventHandlers={{
                  click: () => onCitySelect(city), // ✅ Trigger callback
                }}
              >
                <Tooltip>{city.name}</Tooltip>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
