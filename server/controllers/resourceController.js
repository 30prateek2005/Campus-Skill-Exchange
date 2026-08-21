const Resource =
  require("../models/Resource");

// UPLOAD RESOURCE
const uploadResource =
  async (req, res) => {

    try {

      const {
        title,
        category,
        description,
      } = req.body;

      const resource =
        await Resource.create({

          title,

          category,

          description,

          fileUrl:
            req.file
              ? req.file.path
              : "",

          uploadedBy:
            req.user.id,
        });

      res.status(201).json(
        resource
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET ALL RESOURCES
const getResources =
  async (req, res) => {

    try {

      const resources =
        await Resource.find()
          .populate(
            "uploadedBy",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        resources
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// DELETE RESOURCE
const deleteResource =
  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res
          .status(404)
          .json({
            message:
              "Resource not found",
          });
      }

      await resource.deleteOne();

      res.json({
        message:
          "Resource Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  module.exports = {

  uploadResource,

  getResources,

  deleteResource,
};