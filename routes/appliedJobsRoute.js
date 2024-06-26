const express = require('express');
const router = express.Router();
const appliedJobController = require('../controllers/appliedJobsController');

router.post('/', appliedJobController.applyForJob);
router.get('/:jobId', appliedJobController.getAllAppliedJobs);
router.get('/get/:userId', appliedJobController.getAllAppliedJobsByJobSeeker);
router.delete('/:applicationId', appliedJobController.deleteAppliedJob);



module.exports = router;
