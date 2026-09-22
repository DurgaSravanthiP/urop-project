import cors from "cors";
import crypto from "crypto";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_PATH = path.join(__dirname, "data", "users.json");
const PORT = process.env.PORT || 5000;

const app = express();
const sessions = new Map();

app.use(cors());
app.use(express.json());

function readUsers() {
  const raw = fs.readFileSync(USERS_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function createToken() {
  return crypto.randomBytes(24).toString("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    totalAnalyses: user.totalAnalyses ?? 0,
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
  res.json({ status: "ok", service: "MediScan API" });
});

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body || {};
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

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalizedEmail)) {
    return res
      .status(409)
      .json({ message: "An account with this email already exists." });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    totalAnalyses: 0,
  };
  users.push(newUser);
  writeUsers(users);

  const token = createToken();
  sessions.set(token, publicUser(newUser));
  res.status(201).json({ token, user: publicUser(newUser) });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail);
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

app.listen(PORT, () => {
  console.log(`MediScan API running on http://localhost:${PORT}`);
});
