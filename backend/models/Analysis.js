import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scanType: {
      type: String,
      enum: ["brain_mri", "lung_ct"],
      required: true,
    },
    prediction: { type: String, required: true },
    confidence: { type: Number, required: true },
    imageName: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Analysis", analysisSchema);
