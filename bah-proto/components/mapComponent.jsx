
import { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    
    if (mapRef.current) return;

    const map = L.map('map').setView([22.5937, 78.9629], 5); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    mapRef.current = map;

   
  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default MapComponent;
