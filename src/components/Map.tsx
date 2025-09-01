import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";

const style = await import("../assets/style.json");
import MapMarker from "./MapMarker";
import { createRoot } from "react-dom/client";
import pkg from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const { Marker } = pkg;

interface MapProps {
  waterColor?: string;
  landColor?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  places: any;
  latitude?: number;
  longitude?: number;
  disableLinks?: boolean;
}

const Map: React.FC<MapProps> = ({
  waterColor = "#a0c8f0",
  landColor = "#e0e0e0",
  borderColor = "#ffffff",
  width = "100%",
  height = "400px",
  places,
  latitude = 52.517,
  longitude = 13.388,
  disableLinks = false,
}) => {
  // Change colors in style

  useEffect(() => {
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
      center: [longitude, latitude],
      zoom: 2,
      container: "map",
      attributionControl: false,
      scrollZoom: false,
    });

    console.log("adding places");

    places.forEach((place: any) => {
      if (place.data.latitude && place.data.longitude) {
        const popupNode = document.createElement("div");

        createRoot(popupNode).render(
          <MapMarker
            image={place.data.image}
            name={place.data.name}
            description={place.data.description}
            link={place.data.link}
            disableLink={disableLinks}
          />,
        );

        new maplibregl.Marker({ element: popupNode })
          .setLngLat([place.data.longitude, place.data.latitude])
          .addTo(map);
      }
    });
  }, [waterColor, landColor, places]);

  return (
    <div
      id="map"
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
