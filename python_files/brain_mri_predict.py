import json
import os
import sys
import numpy as np
import tensorflow as tf
from PIL import Image
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, "brain_mri_efficientnet_final.keras")
def predict(image_path: str):
    if not image_path or not os.path.exists(image_path):
        raise FileNotFoundError("Image file not found.")

    image = Image.open(image_path).convert("RGB")
    image = image.resize((224, 224), Image.Resampling.BILINEAR)
    image_array = np.array(image, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)

    model = tf.keras.models.load_model(MODEL_PATH)
    prediction = model.predict(image_array, verbose=0)
    probability = float(prediction[0][0])
    if probability >= 0.5:
        predicted_class = "Tumor"
        confidence = probability
    else:
        predicted_class = "Normal"
        confidence = 1.0 - probability

    return {
        "prediction": predicted_class,
        "confidence": round(float(confidence) * 100, 2),
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "message": "Please provide an image path."}))
        sys.exit(1)

    try:
        result = predict(sys.argv[1])
        print(json.dumps(result))
    except Exception as exc:  # pragma: no cover - CLI safety
        print(json.dumps({"success": False, "message": str(exc)}))
        sys.exit(1)