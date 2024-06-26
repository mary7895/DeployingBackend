const AppliedJob = require('../models/appliedJobsModel')



const applyForJob = async (req, res) => {
  const { userId, jobId } = req.body;
  console.log(`User ${userId} is applying for job ${jobId}`);

  try {
    const existingAppliedJob = await AppliedJob.findOne({ userId, jobId });
    if (existingAppliedJob) {
      console.log(`Job ${jobId} has already been applied for by user ${userId}`);
      return res.status(400).json({ message: 'This Job is already saved by this user!!!!' });
    }

    const appliedJob = new AppliedJob({ userId, jobId });
    await appliedJob.save();

    console.log(`Job application for job ${jobId} by user ${userId} saved successfully`);
    res.status(201).json(appliedJob);
  } catch (err) {
    console.error('Error applying for job:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};





const getAllAppliedJobsByJobSeeker = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 6 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    console.log(`Fetching applied jobs for userId: ${userId}, page: ${pageInt}, limit: ${limitInt}`);

    const AllAppliedJobsByJobSeeker = await AppliedJob.find({ userId })
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .populate('jobId');

    const totalItems = await AppliedJob.countDocuments({ userId });

    const response = {
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      currentPage: pageInt,
      data: AllAppliedJobsByJobSeeker
    };

    console.log('Response:', response);  

    res.json(response);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);  
    res.status(500).json({ error: error.message });
  }
};

const getAllAppliedJobs = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { page = 1, limit = 6 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    const AllAppliedJobs = await AppliedJob.find({ jobId })
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .populate('userId');

    const totalItems = await AppliedJob.countDocuments({ jobId });

    const response = {
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      currentPage: pageInt,
      data: AllAppliedJobs
    };

    console.log(response);  

    res.json(response);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: error.message });
  }
};
const deleteAppliedJob = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    await AppliedJob.findByIdAndDelete(applicationId);
    res.json({ message: 'This Applied Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports ={getAllAppliedJobs,deleteAppliedJob, applyForJob,getAllAppliedJobsByJobSeeker}
