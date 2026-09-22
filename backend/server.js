import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";

import authMiddleware from "./middleware/authMiddleware.js";
import Analysis from "./models/Analysis.js";
import User from "./models/User.js";
import { runPythonPrediction } from "./services/pythonService.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/mediscan";
const JWT_SECRET = process.env.JWT_SECRET || "mediscan-dev-secret";

const app = express();
const uploadDir = path.join(__dirname, "uploads", "temp");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/\s+/g, "_");
      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."));
    }
    cb(null, true);
  },
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function sanitizeUser(user) {
  return {
    id: user._id?.toString?.() || user.id,
    name: user.name,
    email: user.email,
    hospital: user.hospital || "",
    specialization: user.specialization || "",
    doctorId: user.doctorId || "",
  };
}

function signToken(user) {
  return jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function toAnalysisRecord(record) {
  return {
    id: record._id.toString(),
    scanType: record.scanType,
    prediction: record.prediction,
    confidence: Number(record.confidence),
    imageName: record.imageName || "",
    createdAt: record.createdAt,
  };
}

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "MediScan API",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, email, and password are required.",
      });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({
          success: false,
          message: "An account with this email already exists.",
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    const token = signToken(user);
    return res
      .status(201)
      .json({ success: true, token, user: sanitizeUser(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to create account." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email?.trim() || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = signToken(user);
    return res.json({ success: true, token, user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed." });
  }
});

app.post("/api/auth/logout", authMiddleware, (_req, res) => {
  return res.json({ success: true, message: "Logged out successfully." });
});

app.get("/api/auth/profile", authMiddleware, (req, res) => {
  return res.json({ success: true, user: req.user });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  return res.json({ success: true, user: req.user });
});

async function handleAnalyze(req, res) {
  const { scanType } = req.body || {};

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Please upload an image." });
  }

  if (!scanType || !["brain_mri", "lung_ct"].includes(scanType)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid scan type." });
  }

  const tempPath = req.file.path;

  try {
    const prediction = await runPythonPrediction(scanType, tempPath);

    const analysis = await Analysis.create({
      userId: req.user.id,
      scanType,
      prediction: prediction.prediction,
      confidence: Number(prediction.confidence),
      imageName: req.file.originalname,
    });

    return res.status(200).json({
      success: true,
      scanType,
      prediction: prediction.prediction,
      confidence: Number(prediction.confidence),
      id: analysis._id.toString(),
      createdAt: analysis.createdAt,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Python prediction failed.",
      });
  } finally {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

app.post("/api/analyze", authMiddleware, upload.single("image"), handleAnalyze);
app.post(
  "/api/analyses",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    req.body = {
      ...req.body,
      scanType: req.body.scanType || req.body.modality || req.body.type,
    };
    return handleAnalyze(req, res);
  },
);

app.get("/api/analysis/history", authMiddleware, async (req, res) => {
  const items = await Analysis.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return res.json({ success: true, history: items.map(toAnalysisRecord) });
});

app.get("/api/analysis", authMiddleware, async (req, res) => {
  const items = await Analysis.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return res.json({ success: true, history: items.map(toAnalysisRecord) });
});

app.get("/api/analysis/:id", authMiddleware, async (req, res) => {
  const item = await Analysis.findById(req.params.id).lean();
  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Analysis record not found." });
  }

  if (item.userId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized history access." });
  }

  return res.json({ success: true, analysis: toAnalysisRecord(item) });
});

app.get("/api/analyses", authMiddleware, async (req, res) => {
  const items = await Analysis.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return res.json({ success: true, analyses: items.map(toAnalysisRecord) });
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    return res
      .status(400)
      .json({
        success: false,
        message: error.message || "Image upload failed.",
      });
  }

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.message || "Invalid request." });
  }

  return res
    .status(500)
    .json({ success: false, message: "Unexpected server error." });
});

async function startServer() {
  await mongoose.connect(MONGO_URI);
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
}

startServer().catch((error) => {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
});
