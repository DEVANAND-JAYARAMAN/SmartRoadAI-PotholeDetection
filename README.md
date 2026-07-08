# SmartRoadAI-PotholeDetection

AI-powered pothole detection system using ResNet18, FastAPI, and PyTorch for real-time road damage identification.

## Features

- Pothole detection using Deep Learning
- ResNet18 Transfer Learning
- FastAPI REST API
- Image Upload Prediction Endpoint
- Real-time Inference

## Tech Stack

- Python
- PyTorch
- Torchvision
- FastAPI
- Pillow

## API Endpoint

POST /predict

Upload an image and receive:

```json
{
  "prediction": "potholes",
  "confidence": 87.06
}
```

## Project Structure

```text
backend/
frontend/
README.md
```
AI-powered pothole detection system using ResNet18, FastAPI, and PyTorch for real-time road damage identification.
