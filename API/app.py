from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import face_recognition # type: ignore
import numpy as np
import os
from datetime import datetime
import glob
import uuid

app = FastAPI(
    title="Face Recognition Attendance System",
    description="API for registering and recognizing faces using FastAPI + face_recognition",
    version="1.0"
)

@app.on_event("startup")
def startup_load():
    load_known_faces()
    print(f"[startup] Loaded {len(known_encodings)} known faces")


ENC_DIR = "encodings"
TMP_DIR = "tmp"
os.makedirs(ENC_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

known_encodings = []
known_names = []


def load_known_faces():
    """Load all saved encodings from disk"""
    known_encodings.clear()
    known_names.clear()
    for file in glob.glob(f"{ENC_DIR}/*.npy"):
        enc = np.load(file)
        name = os.path.basename(file).split(".")[0]
        known_encodings.append(enc)
        known_names.append(name)


@app.get("/")
def home():
    return {"message": "Face Recognition API is running!"}


@app.post("/encode/")
async def encode_face(image: UploadFile = File(...)):
    """Register a new face"""
    img_path = os.path.join(TMP_DIR, f"{datetime.utcnow().timestamp()}.jpg")

    # Save uploaded image
    with open(img_path, "wb") as f:
        f.write(await image.read())

    # Process image
    img = face_recognition.load_image_file(img_path)
    encodings = face_recognition.face_encodings(img)

    if len(encodings) == 0:
        return JSONResponse({"error": "No face found in image"}, status_code=400)

    encoding = encodings[0]
    filename = os.path.splitext(image.filename or "unknown")[0]
    uid = f"{filename}_{uuid.uuid4().hex[:8]}"
    enc_path = os.path.join(ENC_DIR, f"{uid}.npy")
    np.save(enc_path, encoding)

    load_known_faces() 
    return {"message": f"Encoding saved for {filename}", "face_id": uid,     "encoding_path": enc_path}


@app.post("/recognize/")
async def recognize_face(image: UploadFile = File(...)):
    """Compare face with known encodings"""   
    if not known_encodings:
        load_known_faces()

    img_path = os.path.join(TMP_DIR, f"{datetime.utcnow().timestamp()}.jpg")
    try:
        with open(img_path, "wb") as f:
            f.write(await image.read())

        unknown_img = face_recognition.load_image_file(img_path)
        unknown_encs = face_recognition.face_encodings(unknown_img)

        if len(unknown_encs) == 0:
            return JSONResponse({"error": "No face found"}, status_code=400)

        face_enc = unknown_encs[0]
        distances = face_recognition.face_distance(known_encodings, face_enc)

        if len(distances) == 0:
            return {"match": None}

        best_index = np.argmin(distances)
        best_distance = float(distances[best_index])
    

        # Adjust threshold based on accuracy requirement
        if best_distance < 0.5:
            name = known_names[best_index]
            # print(f"Recognized: {name} with distance {best_distance}")
            return {"match": name, "distance": best_distance}
        else:
            return {"match": None, "distance": best_distance}
    finally:
        if os.path.exists(img_path):
            os.remove(img_path)

# for start the app :- [uvicorn app:app --reload]
#for got to pre-build ui :- write /docs in browser
#for activate virtual env :- conda activate face
