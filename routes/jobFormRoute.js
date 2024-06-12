const express = require("express");
const router = express.Router();
const { addJobForm, updateJobForm, deletJobForm, getJobForm } = require("../controllers/jobFormController");

router.get("/", getJobForm);
router.post("/", addJobForm);
router.put("/:id", updateJobForm);
router.delete("/:id", deletJobForm);

module.exports = router;
