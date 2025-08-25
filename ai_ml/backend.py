from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        features = [
            data['height'],
            data['weight'],
            data['earSize'],
            data['tailLength']
        ]

        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)

        return jsonify({'predicted_label': prediction[0]})

    except KeyError as e:
        return jsonify({'error': f'Missing field: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict-img', methods=['POST'])
def predict_img():
    if '_image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['_image']

    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        image = Image.open(file.stream)

        image = image.resize((128, 128))
        img_array = np.array(image)

        img_array = img_array.flatten().reshape(1, -1)

        prediction = model.predict(img_array)

        return jsonify({
            "prediction": str(prediction[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)