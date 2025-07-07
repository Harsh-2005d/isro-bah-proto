import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat"; // required for heatLayer
import { heatLayer } from "leaflet-heat-es";
import { heatData } from "./data";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([22.59, 78.96], 5);

    // OSM base map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Heatmap data
    const points = heatData;

    heatLayer(points, {
      radius: 50,
      blur: 25,
      gradient: {
        0.2: "#00f",
        0.4: "#0f0",
        0.6: "#ff0",
        1.0: "#f00",
      },
    }).addTo(map);

    mapRef.current = map;
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapComponent;
