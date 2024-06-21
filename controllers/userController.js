const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/userModel");

async function register(req, res) {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    city,
    country,
    category,
    experienceLevel,
    desiredJobType,
    qualifications,
    profilePhoto,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usersModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      city,
      country,
      category,
      experienceLevel,
      desiredJobType,
      qualifications,
      profilePhoto,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await usersModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await usersModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function changeUserActivity(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id).select("isActive");
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log("Login attempt:", email); // Add this line
  try {
    const user = await usersModel.findOne({ email });
    if (!user) {
      console.log("Email not found"); // Add this line
      return res.status(401).json({ message: "Email Not Found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password"); // Add this line
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.firstName + " " + user.lastName,
      },
      process.env.SECRET,
      { expiresIn: "4h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error); // Add this line
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  register,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  changeUserActivity,
  login,
};
