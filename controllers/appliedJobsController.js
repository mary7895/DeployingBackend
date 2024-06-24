const AppliedJob = require('../models/appliedJobsModel');


exports.applyForJob = async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    const appliedJob = new AppliedJob({ jobId, userId });
    await appliedJob.save();
    res.status(201).json({ message: 'You applied successfully ^_^ GOOD LUCK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllAppliedJobs = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const AllAppliedJobs = await AppliedJob.find({ jobId }).populate('userId');
    res.json(AllAppliedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAppliedJob = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    await AppliedJob.findByIdAndDelete(applicationId);
    res.json({ message: 'This Applied Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
