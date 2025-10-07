from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route("/test", methods=["GET"])
def test():
    return "✅ Flask app is running!"

@app.route("/api/flood-risk", methods=["POST"])
def predict_flood():
    
    data = request.json
    print("Received data:", data)

    # Extract all feature values sent from frontend
    location = data.get("location")
    rainfall = data.get("rainfall")
    slope = data.get("slope")
    altitude = data.get("altitude")
    aspect = data.get("aspect")
    curvature = data.get("curvature")
    distanceToStream = data.get("distanceToStream")
    streamDensity = data.get("streamDensity")
    streamPowerIndex = data.get("streamPowerIndex")
    lulc = data.get("lulc")
    sedimentTransportIndex = data.get("sedimentTransportIndex")
    topographicWetnessIndex = data.get("topographicWetnessIndex")
    curveNumber = data.get("curveNumber")
    rainfallDepth = data.get("rainfallDepth")

    # For now, return dummy prediction
    dummy_prediction = {
        "location": location,
        "flood_risk": random.choice(["Very high","High","Moderate","Low","Very low"]),
        "confidence": round(random.uniform(0.0,10.0),2)
    }

    return jsonify(dummy_prediction)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
