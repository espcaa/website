import React from "react";
import "../styles/marker.css";

interface MapMarkerProps {
  image: string;
  name?: string;
  description?: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ image, name, description }) => {
  return (
    <div className="map-marker">
      <img src={image} alt={name || "Marker"} className="marker-image" />
      {(name || description) && (
        <div className="marker-label">
          {name && <strong>{name}</strong>}
          {description && <div>{description}</div>}
        </div>
      )}
    </div>
  );
};

export default MapMarker;
