const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const JobRoute = require("./routes/JobRoute");
const CompanyRoute = require("./routes/CompanyRoutes");
const usersRoute = require("./routes/userRoute");
const jobFormRoute = require("./routes/jobFormRoute");
const auth = require("./middlewares/auth");
const savedJobRoutes = require('./routes/savedJobsRoute');
const appliedJobsRoute = require('./routes/appliedJobsRoute');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/users", usersRoute);
app.use("/jobs", JobRoute);
app.use("/jobForm", jobFormRoute);
app.use("/companies", CompanyRoute);
app.use('/savedJobs', savedJobRoutes);
app.use('/appliedJobs', appliedJobsRoute);


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server started at Port",process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
