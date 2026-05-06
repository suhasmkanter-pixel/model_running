from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

app = FastAPI()

# ✅ ADD THIS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
vectorizer = None

class InputText(BaseModel):
    text: str

@app.on_event("startup")
def load_model():
    global model, vectorizer
    model = pickle.load(open("model.pkl", "rb"))
    vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "Spam Detection API running"}

@app.post("/predict")
def predict(data: InputText):
    transformed = vectorizer.transform([data.text])
    prediction = model.predict(transformed)[0]

    return {
        "prediction": "Spam" if prediction == 1 else "Not Spam"
    }