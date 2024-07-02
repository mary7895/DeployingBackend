const express = require('express');
const router = express.Router();
const { postNewJob, getAllJobs, getJobById,getJobsBySalary, updateJobById, deleteJobById, deleteAllJobs, getJobsByCompanyName, filterJobsByLocationState,filterJobsByLocationGovernment,getAllCounts, getCountByState,getCountByCompanyName,filterSalaryBudget}= require('../controllers/JobController');

router.get('/get',getAllJobs);
router.get('/get/:id',getJobById);
router.get('/dona/:id',GetJobById);
router.get('/getCompany/:companyName?',getJobsByCompanyName);
router.get('/getJobsBySalay',getJobsBySalary);
router.get('/FilterJobsByLoactionState/:State',filterJobsByLocationState);
router.get('/countAll',getAllCounts);
router.get('/CountByState/:State',getCountByState);
router.get('/CountByCompanyName/:companyName',getCountByCompanyName);
router.post('/create',postNewJob);
router.post('/filter',filterSalaryBudget)
router.get('/FilterJobsByLoactionGovernment/:government',filterJobsByLocationGovernment);
router.patch('/update/:id',updateJobById);
router.delete('/delete/:id',deleteJobById);
router.delete('/delete',deleteAllJobs);


module.exports = router;
