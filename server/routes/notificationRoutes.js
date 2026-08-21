const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

// GET NOTIFICATIONS
router.get(
  "/",
  protect,
  getNotifications
);

// MARK AS READ
router.put(
  "/:id/read",
  protect,
  markAsRead
);

module.exports = router;