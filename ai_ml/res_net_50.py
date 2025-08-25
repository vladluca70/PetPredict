import torch
import torchvision.models as models
import joblib

model = models.resnet50(pretrained=True)

model.eval()

joblib.dump(model, "resnet50_model.pkl")