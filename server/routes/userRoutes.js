const express = require("express");

const router = express.Router();

const {
  getProfile,
  searchUsers,
  getAllUsers,
} = require("../controllers/userController");

const authMiddleware =
  require("../middleware/authMiddleware");

// GET PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfile
);
router.get("/", getAllUsers);

// SEARCH USERS
router.get(
  "/search",
  searchUsers
);

module.exports = router;