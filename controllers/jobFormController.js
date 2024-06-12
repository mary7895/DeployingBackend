const jobFormModel = require("../models/jobFormModel");

const addJobForm = (req, res) => {
  const dataJobForm = req.body;
    
  jobFormModel
    .create(dataJobForm)
    .then((savedJobForm) => {
      res.status(201).json(savedJobForm);
    })
    .catch((error) => {
      console.error("Error saving job form:", error);
      res.status(500).json({ error: "Failed to save job form" });
    });
};

const getJobForm = async (req, res) => {
  try {
  let jobForms = await jobFormModel.find();
    res.status(201).json(jobForms);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}
const updateJobForm = async(req, res) => {
  const { id } = req.params;
  const newJobForm = req.body;
  try {
    let updatedForm = await jobFormModel.findByIdAndUpdate(id, newJobForm,{new:true});
    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const deletJobForm = async(req, res) => {
  const { id } = req.params;
  try {
    let deletedForm = await jobFormModel.findByIdAndDelete(id);
    res.status(200).json(deletedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addJobForm,
  getJobForm,
  updateJobForm,
  deletJobForm
};
