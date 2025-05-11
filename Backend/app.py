from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Cari path model (sesuaikan folder-nya)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "Model", "xgb_final_model_1.json")
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

# Load the trained XGBoost model
booster = xgb.Booster()
booster.load_model(MODEL_PATH)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        # pastikan semua field ada
        for f in ("radiation","temperature","humidity","windSpeed"):
            if f not in data:
                return jsonify({"error": f"Missing field {f}"}), 400

        # Derive additional feature
        temp_minus_hum = float(data["temperature"]) - float(data["humidity"])

        # Construct DMatrix in the same feature order
        features = np.array([[ 
            float(data["radiation"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["windSpeed"]),
            temp_minus_hum
        ]], dtype=float)

        dmatrix = xgb.DMatrix(
            features,
            feature_names=["grad","temp_air","hum_air","ff","temp_minus_hum"]
        )
        pred = booster.predict(dmatrix)[0]
        rain = bool(pred >= 0.5)

        return jsonify({
            "prediction": rain,
            "probability": float(pred)
        })
    except Exception as e:
        # log full traceback ke console
        app.logger.exception("Error in predict():")
        # kirim pesan minimal ke client
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
