const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {

  sendMessage,

  getMessages,

} = require(
  "../controllers/messageController"
);

// SEND MESSAGE
router.post(
  "/",
  protect,
  sendMessage
);

// GET CHAT
router.get(
  "/:id",
  protect,
  getMessages
);

module.exports =
  router;