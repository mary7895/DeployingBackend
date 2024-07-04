const express = require('express');
const router = express.Router();
const appliedJobController = require('../controllers/appliedJobsController');
// const{getAllAppliedJobs,deleteAppliedJob}=require('../controllers/appliedJobsController')

router.post('/', appliedJobController.applyForJob);
router.get('/:jobId', appliedJobController.getAllAppliedJobs);
router.get('/get/:userId', appliedJobController.getAllAppliedJobsByJobSeeker);
router.delete('/:applicationId', appliedJobController.deleteAppliedJob);
router.get('/count/:jobId', appliedJobController.getCountByUser);
router.get('/counts/:userId', appliedJobController.countAppliedJobsByUser);



module.exports = router;
