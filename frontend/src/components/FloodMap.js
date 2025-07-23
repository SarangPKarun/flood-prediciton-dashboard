import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import keralaGeo from "../data/kerala.geojson"; // Path to Kerala GeoJSON

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom hook to reposition zoom control
const SetZoomControlPosition = () => {
  const map = useMap();
  useEffect(() => {
    map.zoomControl.setPosition("bottomright");
  }, [map]);
  return null;
};

const KeralaMap = () => {
  const [kerala, setKerala] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);

  // Default center of Kerala
  const keralaCenter = [10.3, 76.4]; // Adjusted slightly to center Kerala

  // Function to generate random points inside the Kerala polygon
  const generateRandomPointsInside = (polygon, count = 50) => {
    const points = [];

    const bbox = turf.bbox(polygon);
    let tries = 0;

    while (points.length < count && tries < 10000) {
      const pt = turf.randomPoint(1, { bbox }).features[0];
      if (turf.booleanPointInPolygon(pt, polygon)) {
        points.push(pt);
      }
      tries++;
    }

    return points;
  };

  useEffect(() => {
    fetch(keralaGeo)
      .then((res) => res.json())
      .then((data) => {
        setKerala(data);

        const polygon =
          data.type === "FeatureCollection" ? data.features[0] : data;

        const points = generateRandomPointsInside(polygon, 30);
        setRandomPoints(points);
      });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={keralaCenter}
        zoom={8} // Fit Kerala in view
        style={{ height: "100%", width: "100%" }}
        minZoom={5}
        maxZoom={17}
      >
        <SetZoomControlPosition />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {kerala && (
          <GeoJSON
            data={kerala}
            style={{
              fillColor: "#228B22",
              fillOpacity: 0.4,
              color: "#006400",
              weight: 2,
            }}
          />
        )}

        {/* Plot random flood-risk points */}
        {randomPoints.map((pt, idx) => (
          <Marker
            key={idx}
            position={[pt.geometry.coordinates[1], pt.geometry.coordinates[0]]}
          >
            <Popup>
              <strong>Flood Risk Location</strong>
              <br />
              ID: {idx + 1}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default KeralaMap;
