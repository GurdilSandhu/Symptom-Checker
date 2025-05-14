from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = joblib.load('../model/model.pkl')

# Filter out unexpected columns including 'Unnamed: 133'
expected_features = [col for col in model.feature_names_in_ if not col.startswith("Unnamed")]

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()

    print("Received data:", data)  # Debugging
    print("Model expects features:", expected_features)  # No redefinition here

    # Create DataFrame with all expected features
    df = pd.DataFrame([{feature: data.get('symptoms', {}).get(feature, 0) for feature in expected_features}])
    # Make prediction
    prediction = model.predict(df)[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
