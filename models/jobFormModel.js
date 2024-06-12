const mongoose = require("mongoose");

const jobFormSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "JobModel", required: true },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
    applicationDate: { type: Date, default: Date.now },
    coverLetter: { type: [String] },
});

module.exports = mongoose.model("jobFormSchema", jobFormSchema);
