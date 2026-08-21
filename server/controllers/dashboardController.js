const User = require("../models/User");

const Resource = require("../models/Resource");

const Request = require("../models/Request");

const getDashboardStats = async (
  req,
  res
) => {

  try {

    // GET USER
    const user = await User.findById(
      req.user.id
    );

    // TOTAL SKILLS
    const totalSkills =
      user.skills.length;

    // TOTAL REQUESTS SENT
    const requestsSent =
      await Request.countDocuments({
        sender: req.user.id,
      });

    // TOTAL REQUESTS RECEIVED
    const requestsReceived =
      await Request.countDocuments({
        receiver: req.user.id,
      });

    // TOTAL RESOURCES
    const resourcesUploaded =
      await Resource.countDocuments({
        uploadedBy: req.user.id,
      });

    res.status(200).json({

      totalSkills,

      requestsSent,

      requestsReceived,

      resourcesUploaded,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};