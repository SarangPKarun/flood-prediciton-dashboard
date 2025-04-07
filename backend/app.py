from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route("/test", methods=["GET"])
def test():
    return "✅ Flask app is running!"


@app.route("/api/flood-risk", methods=["POST"])
def predict_flood():
    data = request.json
    location = data.get("location")

    # Replace this with actual model prediction
    dummy_prediction = {
        "location": location,
        "flood_risk": "High",
        "confidence": 0.87
    }
    return jsonify(dummy_prediction)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
