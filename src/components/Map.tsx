import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;

interface MapProps {
  latitude?: number;
  longitude?: number;
  waterColor?: string;
  landColor?: string;
  zoom?: number;
  width?: string;
  height?: string;
}

const Map: React.FC<MapProps> = ({
  latitude = 37.7749,
  longitude = -122.4194,
  waterColor = "#a0c8f0",
  landColor = "#e0e0e0",
  zoom = 10,
  width = "100%",
  height = "400px",
}) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/spectralo/cmeyf79lm017f01sda33nay6v",
      center: [longitude, latitude],
      zoom,
    });
    map.on("load", () => {
      // Dynamically set land color
      map.setPaintProperty("background", "background-color", landColor);

      // Dynamically set water color
      map.setPaintProperty("water", "fill-color", waterColor);
    });
    // Optional: Add a marker at the center
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove();
  }, [latitude, longitude, zoom, waterColor, landColor]);

  return <div id="map" style={{ width, height, borderRadius: "20px" }} />;
};

export default Map;
