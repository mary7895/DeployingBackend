const express = require('express');
const router = express.Router();
const appliedJobController = require('../controllers/appliedJobsController');

router.post('/', appliedJobController.applyForJob);
router.get('/:jobId', appliedJobController.getAllAppliedJobs);
router.delete('/:applicationId', appliedJobController.deleteAppliedJob);

module.exports = router;
