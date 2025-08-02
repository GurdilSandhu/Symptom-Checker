import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


here = os.path.dirname(__file__)

MODEL_PATH = os.path.abspath(os.path.join(here, "../model/rf_disease_model.joblib"))
ENCODER_PATH = os.path.abspath(os.path.join(here, "../model/label_encoder.joblib"))
COLS_PATH    = os.path.abspath(os.path.join(here, "../model/symptom_columns.json"))

def load_artefact(path, loader, name):
    try:
        return loader(path)
    except Exception as e:
        app.logger.error(f"Cannot load {name}: {e}")
        return None

model  = load_artefact(MODEL_PATH,   joblib.load, "model")
le     = load_artefact(ENCODER_PATH, joblib.load, "label-encoder")
try:
    with open(COLS_PATH) as f:
        feature_cols = json.load(f)
except Exception as e:
    app.logger.error(f"Cannot load symptom column list: {e}")
    feature_cols = None


def build_feature_vector(symptoms):
    """Return 1×n DataFrame with columns in the trained order."""
    row = {feat: int(feat in symptoms) for feat in feature_cols}
    return pd.DataFrame([row])


@app.route("/api/predict", methods=["POST"])
def predict():
    
    if model is None or le is None or feature_cols is None:
        return jsonify({"error": "Server mis-configuration: artefacts missing"}), 500

    payload = request.get_json(force=True, silent=True)
    if not payload or "symptoms" not in payload:
        return jsonify({"error": "Invalid JSON – expected key 'symptoms'"}), 400

    symptoms = payload["symptoms"]
    if not isinstance(symptoms, (list, tuple)):
        return jsonify({"error": "'symptoms' must be a list"}), 400


    X = build_feature_vector(symptoms)
    try:
        probs = model.predict_proba(X)[0]                 # shape (n_classes,)
    except Exception as e:
        app.logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Model cannot generate probabilities"}), 500

    top3_idx = np.argsort(probs)[-3:][::-1]               # best → 3rd-best
    top3_labels = le.inverse_transform(top3_idx)
    top3_probs  = probs[top3_idx]

    prediction = [
        {"rank": i + 1,
         "disease": label,
         "probability": round(float(p), 4)}
        for i, (label, p) in enumerate(zip(top3_labels, top3_probs))
    ]
    return jsonify({"prediction": prediction}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
