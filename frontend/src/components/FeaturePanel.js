import React, { useState } from "react";
import axios from "axios";
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
  onClose,
}) => {
  const [result, setResult] = useState(null); // store prediction result
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/flood-risk", {
        location: `${latitude},${longitude}`, // you can customize what you send
        rainfall,
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
      });

      // Update result state
      setResult(res.data);
    } catch (error) {
      console.error("Error predicting flood:", error);
      setResult({ flood_risk: "Error", confidence: 0 });
    } finally {
      setLoading(false);
    }
  };
  

  const formatValue = (val, unit = "") => {
    if (val === null || val === undefined || isNaN(val)) return "-";
    const num = Number(val);
    return `${num.toFixed(2)}${unit}`;
  };


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

   <div className="feature-row">🏞️ <strong>Slope:</strong> {formatValue(slope, "°")}</div>
<div className="feature-row">🏔️ <strong>Altitude:</strong> {formatValue(altitude, " m")}</div>
<div className="feature-row">🧭 <strong>Aspect:</strong> {formatValue(aspect, "°")}</div>
<div className="feature-row">📐 <strong>Curvature:</strong> {formatValue(curvature)}</div>
<div className="feature-row">🌊 <strong>Distance to Stream:</strong> {formatValue(distanceToStream, " m")}</div>
<div className="feature-row">📏 <strong>Stream Density:</strong> {formatValue(streamDensity)}</div>
<div className="feature-row">⚡ <strong>Stream Power Index:</strong> {formatValue(streamPowerIndex)}</div>
<div className="feature-row">🌿 <strong>LULC:</strong> {formatValue(lulc)}</div>
<div className="feature-row">🪨 <strong>Sediment Transport Index:</strong> {formatValue(sedimentTransportIndex)}</div>
<div className="feature-row">💧 <strong>Topographic Wetness Index:</strong> {formatValue(topographicWetnessIndex)}</div>
<div className="feature-row">📊 <strong>Curve Number:</strong> {formatValue(curveNumber)}</div>
<div className="feature-row">💧 <strong>Rainfall Depth:</strong> {formatValue(rainfallDepth)}</div>

      <button className="predict-btn" onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "🔮 Predict Flood Risk"}
      </button>

      {result && (
        <div className="prediction-result">
          <hr />
          <p><strong>Flood Risk:</strong> {result.flood_risk}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default FeaturePanel;
