const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/userModel");

// async function register(req, res) {
//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     password,
//     city,
//     country,
//     category,
//     experienceLevel,
//     desiredJobType,
//     qualifications,
//     profilePhoto,
//   } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await usersModel.create({
//       firstName,
//       lastName,
//       email,
//       phone,
//       password: hashedPassword,
//       city,
//       country,
//       category,
//       experienceLevel,
//       desiredJobType,
//       qualifications,
//       profilePhoto,
//     });
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// }

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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function changeUserActivity(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id).select("isActive");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// async function login(req, res) {
//   const { email, password } = req.body;
//   try {
//     const user = await usersModel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Email not found" });
//     }
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         userName: `${user.firstName} ${user.lastName}`,
//       },
//       process.env.SECRET,
//       { expiresIn: "4h" }
//     );
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

const register = async (req, res) => {
  const { firstName, lastName, email, phone, password, city, country, category, experienceLevel, desiredJobType, qualifications, profilePhoto, skills, overview, socialMedia } = req.body;
  try {
    let user = await usersModel.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new usersModel({
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
      skills,
      overview,
      socialMedia
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email); // Add this line
  try {
    console.log(`Attempting login for email: ${email}`);
    let user = await usersModel.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Invalid password for email: ${email}`);
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          console.error(`JWT Error: ${err.message}`);
          throw err;
        }
        console.log(`Login successful for email: ${email}`);
       return res.json({ token , user});

      }
    );
  } catch (err) {
    console.error(`Login Error: ${err.message}`);
    return  res.status(500).send('Server error');
  }
};


module.exports = {
  register,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  changeUserActivity,
  login,
};
