from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)

model = models.resnet18(weights="DEFAULT")
num_features = model.fc.in_features

model.fc = nn.Linear(
    num_features,
    2
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "pothole_model_v2.pth")

model.load_state_dict(
    torch.load(MODEL_PATH, map_location=device)
)

model = model.to(device)

model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

classes = [
    "normal",
    "potholes"
]


@app.get("/")
def home():

    return {
        "message": "Pothole Detection API Running"
    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    image = Image.open(file.file).convert("RGB")
    image_tensor = transform(image)

    image_tensor = image_tensor.unsqueeze(0)

    image_tensor = image_tensor.to(device)

    with torch.no_grad():

        outputs = model(image_tensor)

        probabilities = torch.softmax(
            outputs,
            dim=1
        )

        confidence, predicted = torch.max(
            probabilities,
            1
        )

    return {
        "prediction":
            classes[predicted.item()],

        "confidence":
            round(
                confidence.item() * 100,
                2
            )
    }