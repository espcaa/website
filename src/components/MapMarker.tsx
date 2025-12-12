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
        {description && <div>{description}</div>}
      </div>
    </div>
  );
};

export default MapMarker;
