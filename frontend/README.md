# MediScan AI frontend

The frontend is a React application built with Vite. It provides account access, scan upload, prediction results, and analysis history.

For the complete project overview and backend setup, see the [project README](../README.md).

## Run the frontend

From this directory, install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The backend should also be running on `http://localhost:5000`; Vite forwards `/api` requests to it.

## Check the frontend

```powershell
npm run build
npm run lint
```
