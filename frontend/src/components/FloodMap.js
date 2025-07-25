import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import keralaGeo from "../data/kerala.geojson";
import FeaturePanel from "./FeaturePanel";

const SetZoomBottomRight = () => {
  const map = useMap();

  useEffect(() => {
    const zoomControl = L.control.zoom({ position: "bottomright" });
    zoomControl.addTo(map);
    return () => map.removeControl(zoomControl);
  }, [map]);

  return null;
};

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red icon for user-selected point
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const KeralaMap = () => {
  const [kerala, setKerala] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);
  const [showFeaturePanel, setShowFeaturePanel] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);



  // Define Kerala map bounds to restrict panning
  const keralaBounds = [
    [8.17, 74.85], // Southwest
    [12.97, 77.5], // Northeast
  ];


  const [latitude, setLatitude] = useState("9.98");
  const [longitude, setLongitude] = useState("76.25");
  const [rainfall, setRainfall] = useState("");
  const [altitude, setAltitude] = useState("150");
  const [slope, setSlope] = useState("18.5");
  const [aspect, setAspect] = useState("120");
  const [curvature, setCurvature] = useState("0.03");
  const [distanceToStream, setDistanceToStream] = useState("200");
  const [streamDensity, setStreamDensity] = useState("0.8");
  const [streamPowerIndex, setStreamPowerIndex] = useState("3.5");
  const [lulc, setLulc] = useState("Agricultural");
  const [sedimentTransportIndex, setSedimentTransportIndex] = useState("2.4");
  const [topographicWetnessIndex, setTopographicWetnessIndex] = useState("10.2");
  const [curveNumber, setCurveNumber] = useState("72");
  const [rainfallDepth, setRainfallDepth] = useState("120");

  const handlePredict = () => {
    // Call API or model here
    alert("Flood prediction triggered!");
  };

  // 👇 Add this just above the return()
  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (e) => {
        const clickedPoint = turf.point([e.latlng.lng, e.latlng.lat]);

        const polygon =
          kerala?.type === "FeatureCollection" ? kerala.features[0] : kerala;

        if (turf.booleanPointInPolygon(clickedPoint, polygon)) {
          setSelectedPoint(e.latlng);
          setLatitude(e.latlng.lat.toFixed(6));
          setLongitude(e.latlng.lng.toFixed(6));
          setShowFeaturePanel(true);
          console.log("Clicked inside Kerala at:", e.latlng);
        } else {
          console.log("Clicked outside Kerala");
        }
      },
    });

    return null;
  };

  // Function to generate random points inside the Kerala polygon
  const generateRandomPointsInside = (polygon, count = 50) => {
    const points = [];

    const bbox = turf.bbox(polygon); // bounding box of Kerala
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
          data.type === "FeatureCollection" ? data.features[0] : data; // adjust depending on format

        const points = generateRandomPointsInside(polygon, 30);
        setRandomPoints(points);
      });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[10.5, 76.2]}
        zoom={7.5}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        maxBounds={keralaBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        <SetZoomBottomRight />

        {kerala && (
          <GeoJSON
            data={kerala}
            style={{
              fillColor: "#228B22",
              fillOpacity: 0.5,
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

        {selectedPoint && (
          <Marker position={selectedPoint} icon={redIcon}>
            <Popup>
              <strong>Selected Point</strong>
              <br />  
              Lat: {selectedPoint.lat.toFixed(4)}
              <br />
              Lng: {selectedPoint.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}

        <MapClickHandler />

        {showFeaturePanel && (
          <FeaturePanel
          latitude={latitude}
          longitude={longitude}
          rainfall={rainfall}
          onRainfallChange={setRainfall}
          altitude={altitude}
          slope={slope}
          aspect={aspect}
          curvature={curvature}
          distanceToStream={distanceToStream}
          streamDensity={streamDensity}
          streamPowerIndex={streamPowerIndex}
          lulc={lulc}
          sedimentTransportIndex={sedimentTransportIndex}
          topographicWetnessIndex={topographicWetnessIndex}
          curveNumber={curveNumber}
          rainfallDepth={rainfallDepth}
          onPredict={handlePredict}
          onClose={() => setShowFeaturePanel(false)}
        />
        )}
      </MapContainer>
    </div>
  );
};

export default KeralaMap;
