import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)

# Allow all origins (for development)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Get absolute path for the model file
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../model/model1.pkl"))

# Load the retrained model
try:
    model = joblib.load(model_path)
    print("Model loaded successfully.")
except FileNotFoundError:
    print(f" Model file not found at: {model_path}")
    model = None  # Set to None to avoid crashes

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debugging

        if not data or 'symptoms' not in data:
            return jsonify({"error": "Invalid input, 'symptoms' key is missing"}), 400

        symptoms_received = data.get('symptoms', [])

        # Ensure all model features are present in the input
        df = pd.DataFrame([{feature: 1 if feature in symptoms_received else 0 for feature in model.feature_names_in_}])

        # Make prediction
        prediction = model.predict(df)[0]

        return jsonify({'prediction': prediction})  # Adjust confidence logic if needed
        #return jsonify({'message': f'There may be chances of ', {prediction}'})


    except Exception as e:
        print("Error in prediction:", str(e))  # Log error for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
