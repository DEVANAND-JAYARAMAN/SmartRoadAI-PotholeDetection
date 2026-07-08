---
title: SmartRoadAI Pothole Detection
emoji: 🛣️
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---

# SmartRoadAI - Pothole Detection API

AI-powered pothole detection using ResNet18 + FastAPI.

## API

**POST** `/predict` — Upload a road image, returns:

```json
{
  "prediction": "potholes",
  "confidence": 97.52
}
```
