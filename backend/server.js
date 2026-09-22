import cors from "cors";
import crypto from "crypto";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import User from "./models/User.js";
import Analysis from "./models/Analysis.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mediscan";

const app = express();
const sessions = new Map();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors());
app.use(express.json());

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function createToken() {
  return crypto.randomBytes(24).toString("hex");
}

function publicUser(user) {
  return {
    id: user._id?.toString() || user.id,
    name: user.name,
    email: user.email,
    hospital: user.hospital || "",
    specialization: user.specialization || "",
    doctorId: user.doctorId || "",
  };
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = sessions.get(token);
  req.token = token;
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "MediScan API",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, hospital, specialization, doctorId } =
    req.body || {};
  if (!name?.trim() || !email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  try {
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      hospital,
      specialization,
      doctorId,
    });
    const token = createToken();
    sessions.set(token, publicUser(newUser));
    return res.status(201).json({ token, user: publicUser(newUser) });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    return res.status(500).json({ message: "Unable to create account." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken();
  sessions.set(token, publicUser(user));
  res.json({ token, user: publicUser(user) });
});

app.post("/api/auth/logout", authMiddleware, (req, res) => {
  sessions.delete(req.token);
  res.json({ message: "Logged out" });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.post(
  "/api/analyses",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { patientId, modality, age, gender } = req.body || {};
    if (!patientId?.trim() || !["MRI", "CT"].includes(modality))
      return res
        .status(400)
        .json({ message: "Patient ID and MRI/CT modality are required." });
    const analysis = await Analysis.create({
      userId: req.user.id,
      patientId: patientId.trim(),
      modality,
      age: age ? Number(age) : undefined,
      gender,
      image: req.file
        ? {
            name: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
          }
        : undefined,
    });
    res.status(201).json({ analysis });
  },
);

app.patch("/api/analyses/:id/save", authMiddleware, async (req, res) => {
  const analysis = await Analysis.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { saved: true },
    { new: true },
  );
  if (!analysis)
    return res.status(404).json({ message: "Analysis not found." });
  res.json({ analysis });
});

app.get("/api/analyses", authMiddleware, async (req, res) => {
  const analyses = await Analysis.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  res.json({ analyses });
});

async function start() {
  await mongoose.connect(MONGO_URI);
  await User.updateOne(
    { email: "demo@mediscan.ai" },
    {
      $setOnInsert: {
        name: "Demo User",
        email: "demo@mediscan.ai",
        passwordHash:
          "d3ad9315b7be5dd53b31a273b3b3aba5defe700808305aa16a3062b76658a791",
        hospital: "MediScan Research Lab",
        specialization: "Medical Imaging",
        doctorId: "DEMO-001",
      },
    },
    { upsert: true },
  );
  const server = app.listen(PORT, () =>
    console.log(
      `MediScan API running on http://localhost:${PORT} (MongoDB connected)`,
    ),
  );
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Stop the existing backend or run with a different PORT.`,
      );
      process.exit(1);
    }
    throw error;
  });
}

start().catch((error) => {
  console.error(`Unable to connect to MongoDB at ${MONGO_URI}:`, error.message);
  process.exit(1);
});
