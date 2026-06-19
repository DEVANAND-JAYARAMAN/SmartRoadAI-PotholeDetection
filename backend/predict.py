# predict.py

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

classes = ["normal", "potholes"]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

model = models.resnet18(weights=None)

model.fc = nn.Linear(
    model.fc.in_features,
    2
)

model.load_state_dict(
    torch.load(
        "pothole_model.pth",
        map_location=torch.device("cpu")
    )
)

model.eval()


def predict_image(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0)

    with torch.no_grad():

        outputs = model(image)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, predicted = torch.max(
            probabilities,
            1
        )

    return {
        "class": classes[predicted.item()],
        "confidence": round(confidence.item() * 100, 2)
    }