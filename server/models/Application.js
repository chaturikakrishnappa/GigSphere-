const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "shortlisted", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

applicationSchema.index({ gig: 1, freelancer: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
