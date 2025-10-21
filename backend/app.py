from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import random
import os
import rasterio

# app = Flask(__name__)
app = Flask(__name__, static_url_path="/layers", static_folder="layers")

CORS(app)  # Allow frontend to access backend
BASE_DIR = os.path.dirname(__file__)
print(BASE_DIR)
LAYERS_DIR = os.path.join(BASE_DIR, "layers")


@app.route("/test", methods=["GET"])
def test():
    return "✅ Flask app is running!"

# ----------------- Serve layer URL -----------------
@app.route("/api/layer-url/<layer_name>")
def layer_url(layer_name):
    print("Requested layer:", layer_name) 

    layer_file = f"{layer_name}.tif"
    if not os.path.exists(os.path.join(LAYERS_DIR, layer_file)):
        return jsonify({"error": "Layer not found"}), 404
    url = f"http://localhost:5000/layers/{layer_file}"

    return jsonify({"url": url})


# ----------------- Get raster value at lat/lng -----------------
@app.route("/api/raster-value")
def layer_value():
    lat = request.args.get("lat", type=float)
    lng = request.args.get("lng", type=float)

    if lat is None or lng is None:
        return jsonify({"error": "lat & lng required"}), 400
    results = {}    

    try:
        # Loop through all GeoTIFF files in layers directory
        for filename in os.listdir(LAYERS_DIR):
            if not filename.lower().endswith((".tif", ".tiff")):
                continue

            layer_name = os.path.splitext(filename)[0]
            layer_path = os.path.join(LAYERS_DIR, filename)

            try:
                with rasterio.open(layer_path) as src:
                    # Convert lat/lng → row/col
                    row, col = src.index(lng, lat)
                    value = src.read(1)[row, col]

                    # Convert to Python float (avoid numpy float32 JSON issue)
                    results[layer_name] = float(value)
            except Exception as e:
                # Skip problematic rasters but keep others
                print(f"⚠️ Failed reading {layer_name}: {e}")
                results[layer_name] = None

        return jsonify(results)

    except Exception as e:
        print("❌ Error in raster value extraction:", e)
        return jsonify({"error": "Failed to read rasters"}), 500
    
    


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
