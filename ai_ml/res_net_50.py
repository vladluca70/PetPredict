import torch
import torchvision.models as models

model = models.resnet50(pretrained=True)
model.eval()

torch.save(model.state_dict(), "resnet50_model.pth")
