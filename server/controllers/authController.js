const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success response
    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success response
    res.json({
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Send user profile
    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE USER PROFILE
const updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.department = req.body.department || user.department;
    user.year = req.body.year || user.year;
    user.bio = req.body.bio || user.bio;
    user.skills = req.body.skills || user.skills;

    // Update social links
    user.socialLinks = {
      github:
        req.body.socialLinks?.github || user.socialLinks?.github,

      linkedin:
        req.body.socialLinks?.linkedin || user.socialLinks?.linkedin,
    };

    // Save updated user
    const updatedUser = await user.save();

    // Response
    res.json({
      message: "Profile Updated Successfully",
      updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addSkills = async (req, res) => {
  try {

    const { skills } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Add new skills
    user.skills = [...new Set([...user.skills, ...skills])];

    await user.save();

    res.json({
      message: "Skills Added Successfully",
      skills: user.skills,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const resetPassword = async (req, res) => {

  try {

    const {
      email,
      newPassword,
      confirmPassword,
    } = req.body;

    // CHECK PASSWORD MATCH
    if (newPassword !== confirmPassword) {

      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    // HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        salt
      );

    // UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        "Password Reset Successful",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addSkills,
  resetPassword,
};