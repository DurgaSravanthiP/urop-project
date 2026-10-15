# MediScan AI

MediScan AI is a web application for organizing and reviewing two kinds of medical images:

- **Brain MRI** — predicts `Tumor` or `Normal`.
- **Lung CT** — predicts `Cancerous` or `Non-Cancerous`.

The application is intended for educational and research use. Its model output is not a medical diagnosis and should not replace assessment by a qualified healthcare professional.

## How it works

1. A doctor creates an account and signs in.
2. The doctor opens **Analyze Scan**, enters a patient ID, chooses Brain MRI or Lung CT, and uploads one image.
3. The React frontend sends the image to the Express backend.
4. The backend runs the matching Python prediction script and loads its saved Keras model.
5. The prediction and confidence are saved in MongoDB and shown to the user.
6. **History** displays saved analysis results and their date and time.

## Project structure

```text
backend/
  models/                 MongoDB schemas
  services/               Python model integration
  server.js               Express API, authentication, and analysis routes
frontend/
  src/                    React pages, components, and API services
  vite.config.js          Vite development server and API proxy
python_files/
  brain_mri_model.ipynb   Brain MRI model training and evaluation
  lung_ct_model.ipynb     Lung CT model training and evaluation
  dataset_inspection.ipynb Dataset inspection and train/validation/test split
  brain_mri_predict.py    Brain MRI inference
  lung_ct_predict.py      Lung CT inference
  *_efficientnet_*.keras  Saved model files
  datasets/               Original image datasets (local)
  processed_data/         Train, validation, and test image splits (local)
```

The training notebooks use TensorFlow/Keras and EfficientNetB0 with 224 × 224 RGB images. The dataset inspection notebook creates class-based training, validation, and test folders using a 70% / 15% / 15% split. The prediction scripts must use the same image size, pixel scale, and class interpretation used by training.

## Requirements

- Node.js and npm
- Python with TensorFlow, NumPy, and Pillow installed
- MongoDB, running locally or available through a MongoDB connection URI

The Python interpreter found by the backend's `python` command must have the required Python packages installed. For example:

```powershell
python -m pip install tensorflow numpy pillow
```

Use a Python version for which TensorFlow is available on your system.

## Run locally on Windows

### 1. Configure MongoDB and the backend

Start MongoDB. In a PowerShell terminal:

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env` if needed. Set `MONGODB_URI` to your MongoDB connection URI and replace `JWT_SECRET` with a private random secret. Keep `.env` private; it is excluded from Git.

Install backend dependencies and start the API:

```powershell
npm install
npm run dev
```

The API listens on `http://localhost:5000` by default. Keep this terminal running.

### 2. Start the frontend

Open a second PowerShell terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The Vite development server forwards `/api` requests to the backend on port 5000.

### 3. Use the application

1. Sign up, then sign in.
2. Open **Analyze Scan**.
3. Enter a patient ID, select the matching scan type, and upload a supported image (JPG, PNG, or WEBP; up to 5 MB).
4. Run the analysis and review the prediction and confidence.
5. Open **History** to review saved predictions and timestamps.

## Run the model notebooks

The notebooks and image datasets are under `python_files/`. Open them in Jupyter or VS Code with a Python environment containing TensorFlow, NumPy, Pillow, and Matplotlib.

1. Confirm the original dataset folders exist under `python_files/datasets/`.
2. Run `dataset_inspection.ipynb` to inspect the data and create the train, validation, and test splits in `python_files/processed_data/`.
3. Run the relevant model notebook from top to bottom to train, evaluate, and save the model.
4. The prediction scripts load the corresponding `*_efficientnet_final.keras` file. Keep the model and its prediction script together in `python_files/`.

Training can take time and may require substantial memory. The committed/local `.keras` files allow inference without training again.

## Useful commands

From `frontend/`:

```powershell
npm run build
npm run lint
```

From `backend/`:

```powershell
npm run dev
npm start
```

## Data and privacy notes

- Image datasets and generated train/validation/test folders are local project data and may be large.
- Uploaded analysis images are kept under `backend/uploads/`; this directory is excluded from Git.
- Do not upload identifiable patient information or real clinical images unless you have the necessary authorization and safeguards.
- Model confidence is not a measure of clinical certainty. Always review outputs with appropriate clinical context.
