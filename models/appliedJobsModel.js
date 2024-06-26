const mongoose = require("mongoose");
const appliedJobStatusEnum = ["accepted", "rejected", "pending"];
const AppliedJobsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
appliedJobStatus: { type: String, required: true, enum: appliedJobStatusEnum,default: "pending" }
});



const AppliedJob = mongoose.model("AppliedJob", AppliedJobsSchema);

module.exports = AppliedJob;
