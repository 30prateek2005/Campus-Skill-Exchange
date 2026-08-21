const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
    },

    year: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    bio: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    socialLinks: {
      github: String,
      linkedin: String,
    },

    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);                     