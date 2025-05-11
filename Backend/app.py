from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained XGBoost model
booster = xgb.Booster()
booster.load_model("model/xgb_final_model_1.json")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Derive additional feature
    temp_minus_hum = data["temperature"] - data["humidity"]

    # Construct DMatrix in the same feature order
    features = np.array([[ 
        data["radiation"],
        data["temperature"],
        data["humidity"],
        data["windSpeed"],
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)