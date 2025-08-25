from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import torchvision.transforms as transforms
import torchvision.models as models
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# Model pentru date tabulare
model = joblib.load('model.joblib')

# Model ResNet50 pentru imagini
resnet50 = models.resnet50(pretrained=True)
resnet50.eval()

# Transformările necesare pentru ResNet50
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406], 
        std=[0.229, 0.224, 0.225]
    )
])

# Încarcă clasele ImageNet
with open("imagenet_classes.txt") as f:
    imagenet_labels = [line.strip() for line in f.readlines()]

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
        # Încarcă și preprocesează imaginea
        image = Image.open(file.stream).convert('RGB')
        img_tensor = preprocess(image).unsqueeze(0)

        with torch.no_grad():
            outputs = resnet50(img_tensor)
            probabilities = torch.softmax(outputs, dim=1)  # transformă în probabilități

            # Top 3 predicții
            top_probs, top_idxs = torch.topk(probabilities, 3)

        # Formatează rezultatul
        top_predictions = []
        for prob, idx in zip(top_probs[0], top_idxs[0]):
            top_predictions.append({
                "label": imagenet_labels[idx.item()],
                "probability": round(prob.item() * 100, 2)  # procent
            })

        return jsonify({"predictions": top_predictions})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
