import uvicorn
from fastapi import ( 
  Depends, 
  FastAPI, 
  HTTPException, 
  UploadFile,
  Depends, 
  Path,
)
import base64 
from pydantic import BaseModel
import numpy as np
from ultralytics import YOLO
import cv2

from detect_al import detect_img
from database import engineconn
from models import Test
from domain.user import user_router

app = FastAPI()

model = YOLO("best.pt")

engine = engineconn()
session = engine.sessionmaker()

class Item(BaseModel):
 image: str

@app.get("/")
async def read_root():
 return {"message": "Hello, World!"}

@app.post("/detect/")
async def detect_objects(file: Item):
 # Process the uploaded image for object detection
 
 header, data = file.image.split(',', 1)
 image_bytes = base64.b64decode(data)
 image = np.frombuffer(image_bytes, dtype=np.uint8)
 image = cv2.imdecode(image, cv2.IMREAD_COLOR)


 # Perform object detection with YOLOv8
 image, result = detect_img(image, model)
 if result == "detected":
  eye_db = Test()
  eye_db.result = result
  eye_db.img = image

  session.add(eye_db)
  session.commit()

 return {"detections": result}

# Dependency

"""
@app.get("/test")
async def first_get():
    example = session.query(Test).all()
    return example
"""
app.include_router(user_router.router)

if __name__ == "__main__":
 uvicorn.run(app, port=8000, host='0.0.0.0')
