const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobsController');

router.get('/:userId', savedJobController.getSavedJobs);
router.delete('/:savedJobId', savedJobController.deleteSavedJob);
router.post('/', savedJobController.saveJob);
module.exports = router;
