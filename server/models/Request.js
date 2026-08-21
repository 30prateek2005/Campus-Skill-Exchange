const mongoose = require("mongoose");

const requestSchema =
  new mongoose.Schema(

    {
      creatorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
      senderName: {
        type: String,
        required: true,
      },

      senderEmail: {
        type: String,
        required: true,
      },

      skill: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Pending",
      },

    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Request",
  requestSchema
);