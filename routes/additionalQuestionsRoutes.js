const express = require("express");
const router = express.Router();
const { addJobForm, updateJobForm, deleteJobForm, getJobForm ,getFormByJobId} = require("../controllers/additionalQuestionsController");

router.get("/", getJobForm);
router.get("/:id",getFormByJobId)
router.post("/", addJobForm);
router.put("/:id", updateJobForm);
router.delete("/:id", deleteJobForm);

module.exports = router;
