import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    hospital: { type: String, default: "" },
    specialization: { type: String, default: "" },
    doctorId: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
