const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  uploadResource,
  getResources,
  deleteResource,
} = require(
  "../controllers/resourceController"
);

const protect =
  require("../middleware/authMiddleware");

// STORAGE CONFIGURATION
const storage =
  multer.diskStorage({

    destination: function (
      req,
      file,
      cb
    ) {

      cb(null, "uploads/");
    },

    filename: function (
      req,
      file,
      cb
    ) {

      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

// MULTER CONFIG
const upload = multer({
  storage,
});

// GET ALL RESOURCES
router.get(
  "/",
  getResources
);

// UPLOAD RESOURCE
router.post(
  "/",
  protect,
  upload.single("file"),
  uploadResource
);

// DELETE RESOURCE
router.delete(
  "/:id",
  protect,
  deleteResource
);

module.exports = router;