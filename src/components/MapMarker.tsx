import React from "react";
import "../styles/marker.css";

interface MapMarkerProps {
  image: string;
  name?: string;
  description?: string;
  link: string;
  disableLink?: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  image,
  name,
  description,
  link,
  disableLink = false,
}) => {
  return (
    <div className="map-marker-container">
      <div className="map-marker-popup">
        <div
          className="map-marker"
          onClick={(e) => {
            if (!disableLink) {
              window.location.href = link;
            }
          }}
        >
          <img
            src={`/places/${image}.webp`}
            alt={name || "Marker"}
            className="marker-image"
          />
          <div className="marker-label">
            {name && <div className="marker-name">{name}</div>}
          </div>
        </div>
      </div>
      <div
        className="map-marker-pin"
        onClick={(e) => {
          if (!disableLink) {
            window.location.href = link;
          }
        }}
      >
        <div
          className="map-marker-pin-circle"
          onClick={(e) => {
            if (!disableLink) {
              window.location.href = link;
            }
          }}
        ></div>
      </div>
    </div>
  );
};

export default MapMarker;
