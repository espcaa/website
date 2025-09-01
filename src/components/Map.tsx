import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const style = await import("../assets/style.json");
import MapMarker from "./MapMarker";
import { createRoot } from "react-dom/client";
import pkg from "maplibre-gl";
const { Marker } = pkg;

interface MapProps {
  waterColor?: string;
  landColor?: string;
  borderColor?: string;
  zoom?: number;
  width?: string;
  height?: string;
  places: any;
}

const Map: React.FC<MapProps> = ({
  waterColor = "#a0c8f0",
  landColor = "#e0e0e0",
  borderColor = "#ffffff",
  zoom = 10,
  width = "100%",
  height = "400px",
  places,
}) => {
  // Change colors in style
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new maplibregl.Map({
      style: {
        ...style,
        layers: style.layers.map((layer) => {
          if (layer.id.includes("water") && layer.type === "fill") {
            return {
              ...layer,
              paint: { ...layer.paint, "fill-color": waterColor },
            };
          }
          if (layer.id.includes("background") && layer.type === "background") {
            return {
              ...layer,
              paint: { ...layer.paint, "background-color": landColor },
            };
          }
          if (layer.id.includes("boundary") && layer.type === "line") {
            return {
              ...layer,
              paint: { ...layer.paint, "line-color": borderColor },
            };
          }
          return layer;
        }),
      } as any,
      center: [13.388, 52.517],
      zoom: 1.0,
      container: mapContainer.current,
      attributionControl: false,
    });

    map.on("load", () => map.resize());

    console.log("adding places");
    const el = document.createElement("div");
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.background = "red";
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([4.837444, 45.764043])
      .addTo(map);
    let marker2 = new Marker({
      color: "#FFFFFF",
      draggable: true,
    })
      .setLngLat([30.5, 50.5])
      .addTo(map);
    return () => map.remove();
  }, [zoom, waterColor, landColor, places]);

  return (
    <div
      ref={mapContainer}
      style={{
        width,
        height,
        borderRadius: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    ></div>
  );
};

export default Map;
