const mongoose = require("mongoose");

const AppliedJobsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const AppliedJob = mongoose.model("AppliedJob", AppliedJobsSchema);

module.exports = AppliedJob;
