const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createRequest,
  getRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

router.post(
  "/",
  protect,
  createRequest
);

router.get(
  "/",
  protect,
  getRequests
);

router.put(
  "/:id",
  protect,
  updateRequestStatus
);

module.exports = router;