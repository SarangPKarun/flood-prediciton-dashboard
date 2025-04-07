import React, { useState } from "react";
import axios from "axios";

function FloodPredictor() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/flood-risk", {
      location,
    });
    setResult(res.data);
  };

  return (
    <div>
      <h2>Flood Susceptibility Predictor</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit}>Predict</button>

      {result && (
        <div>
          <p>
            <strong>Location:</strong> {result.location}
          </p>
          <p>
            <strong>Flood Risk:</strong> {result.flood_risk}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
}

export default FloodPredictor;
