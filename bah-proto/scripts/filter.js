import fs from "fs";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

// Load India GeoJSON
const indiaGeoJSON = JSON.parse(fs.readFileSync("./data/india-border.geojson", "utf8"));
const indiaPolygon = indiaGeoJSON.features[0]; // Assuming one polygon

// Load PM grid data
const gridData = JSON.parse(fs.readFileSync("public/pm_grid_data.json", "utf8"));

// Filter points within India
const filtered = gridData.filter((pt) => {
  const turfPoint = point([pt.lon, pt.lat]); // GeoJSON uses [lon, lat]
  return booleanPointInPolygon(turfPoint, indiaPolygon);
});

fs.writeFileSync("public/pm_grid_data_filtered.json", JSON.stringify(filtered, null, 2));

console.log(`✅ Filtered data: ${filtered.length} out of ${gridData.length} points retained inside India`);
