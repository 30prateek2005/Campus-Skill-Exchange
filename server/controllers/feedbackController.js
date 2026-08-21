const Feedback = require("../models/Feedback");

const giveFeedback = async (req, res) => {
  try {

    const {
      mentor,
      request,
      rating,
      comment,
    } = req.body;

    const feedback = await Feedback.create({
      mentor,
      request,
      rating,
      comment,
      student: req.user.id,
    });

    res.status(201).json({
      message: "Feedback Submitted Successfully",
      feedback,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  giveFeedback,
};