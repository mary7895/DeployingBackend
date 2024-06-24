const mongoose = require("mongoose");

const categoryEnum = ["Programming", "Health Care", "Finance", "Accounting"];
const desiredJobTypesEnum = [
  "Full Time",
  "Part Time",
  "Internship",
  "Freelance",
  "None",
];
const experienceLevelEnum = ["Fresh", "Junior", "Senior", "Expert"];
const qualificationsEnum = ["Master's Degree", "Bachelors Degree", "None"];

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true, enum: categoryEnum },
  experienceLevel: { type: String, required: true, enum: experienceLevelEnum },
  desiredJobType: { type: String, required: true, enum: desiredJobTypesEnum },
  qualifications: { type: String, required: true, enum: qualificationsEnum },
  profilePhoto: { type: String },
  skills: [{ type: String }],
  overview: { type: String },
  socialMedia: {
    linkedin: { type: String },
    facebook: { type: String },
  },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
