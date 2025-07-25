import React from "react";
import "./FeaturePanel.css";

const FeaturePanel = ({
  latitude,
  longitude,
  rainfall,
  onRainfallChange,
  slope,
  altitude,
  aspect,
  curvature,
  distanceToStream,
  streamDensity,
  streamPowerIndex,
  lulc,
  sedimentTransportIndex,
  topographicWetnessIndex,
  curveNumber,
  rainfallDepth,
  onPredict,
  onClose, // 👈 new prop
}) => {
  return (
    <div className="feature-panel">
      <div className="feature-panel-header">
        <h2>Feature Panel</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <hr />

      <div className="feature-row">📍 <strong>Latitude:</strong> {latitude}</div>
      <div className="feature-row">📍 <strong>Longitude:</strong> {longitude}</div>

      <div className="feature-row">
        🌧️ <strong>Rainfall:</strong>
        <input
          type="number"
          value={rainfall}
          onChange={(e) => onRainfallChange(e.target.value)}
          placeholder="Enter mm"
        />
      </div>

      <div className="feature-row">🏞️ <strong>Slope:</strong> {slope}°</div>
      <div className="feature-row">🏔️ <strong>Altitude:</strong> {altitude} m</div>
      <div className="feature-row">🧭 <strong>Aspect:</strong> {aspect}°</div>
      <div className="feature-row">📐 <strong>Curvature:</strong> {curvature}</div>
      <div className="feature-row">🌊 <strong>Distance to Stream:</strong> {distanceToStream} m</div>
      <div className="feature-row">📏 <strong>Stream Density:</strong> {streamDensity}</div>
      <div className="feature-row">⚡ <strong>Stream Power Index:</strong> {streamPowerIndex}</div>
      <div className="feature-row">🌿 <strong>LULC:</strong> {lulc}</div>
      <div className="feature-row">🪨 <strong>Sediment Transport Index:</strong> {sedimentTransportIndex}</div>
      <div className="feature-row">💧 <strong>Topographic Wetness Index:</strong> {topographicWetnessIndex}</div>
      <div className="feature-row">📊 <strong>Curve Number:</strong> {curveNumber}</div>
      <div className="feature-row">💧 <strong>Rainfall Depth:</strong> {rainfallDepth}</div>

      <button className="predict-btn" onClick={onPredict}>
        🔮 Predict Flood Risk
      </button>
    </div>
  );
};

export default FeaturePanel;
