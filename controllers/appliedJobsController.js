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
    const { page = 1, limit = 8 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    const AllAppliedJobs = await AppliedJob.find({ jobId })
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .populate('userId');

    const totalItems = await AppliedJob.countDocuments({ jobId });

    res.json({
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      currentPage: pageInt,
      data: AllAppliedJobs
    });
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
