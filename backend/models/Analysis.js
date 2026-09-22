import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: { type: String, required: true, trim: true },
    modality: { type: String, enum: ["MRI", "CT"], required: true },
    age: Number,
    gender: String,
    image: { name: String, mimeType: String, size: Number },
    prediction: { type: String, default: "Pending model connection" },
    diseaseType: { type: String, default: "Dataset label pending" },
    confidence: { type: Number, default: null },
    modelName: { type: String, default: "Pending Python model" },
    saved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Analysis", analysisSchema);
