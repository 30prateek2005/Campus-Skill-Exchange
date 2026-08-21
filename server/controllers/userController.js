const User = require("../models/User");

// SEARCH USERS BY SKILL
const searchUsersBySkill = async (
  req,
  res
) => {

  try {

    const { skill } = req.query;

    const users = await User.find({
      skills: {
        $regex: skill,
        $options: "i",
      },
    }).select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROFILE
const getProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// SEARCH USERS
const searchUsers = async (
  req,
  res
) => {

  try {

    const keyword =
      req.query.search
        ? {
            name: {
              $regex:
                req.query.search,
              $options: "i",
            },
          }
        : {};

    const users =
      await User.find(keyword)
        .select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("_id name email");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  searchUsersBySkill,
  getProfile,
  searchUsers,
  getAllUsers,
};