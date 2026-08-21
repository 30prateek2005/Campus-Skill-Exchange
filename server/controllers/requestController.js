const Request = require("../models/Request");

/* CREATE REQUEST */

exports.createRequest = async (req, res) => {

  try {

    const newRequest = new Request({

      ...req.body,

      creatorId: req.user.id,

    });

    await newRequest.save();

    res.status(201).json(newRequest);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

/* GET ALL REQUESTS */

exports.getRequests = async (req, res) => {

  try {

    const requests =
      await Request.find()
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

/* UPDATE REQUEST STATUS */

exports.updateRequestStatus = async (
  req,
  res
) => {

  try {

    const updatedRequest =
      await Request.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    if (!updatedRequest) {

      return res.status(404).json({
        message: "Request not found",
      });

    }

    res.json(updatedRequest);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};