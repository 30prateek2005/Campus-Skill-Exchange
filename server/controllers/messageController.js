const Message =
  require("../models/Message");

// SEND MESSAGE
const sendMessage =
  async (req, res) => {

    try {

      const {
        receiver,
        message,
      } = req.body;

      const newMessage =
        await Message.create({

          sender:
            req.user.id,

          receiver,

          message,
        });

      res.status(201).json(
        newMessage
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET CHAT HISTORY
const getMessages =
  async (req, res) => {

    try {

      const messages =
        await Message.find({

          $or: [

            {
              sender:
                req.user.id,

              receiver:
                req.params.id,
            },

            {
              sender:
                req.params.id,

              receiver:
                req.user.id,
            },
          ],
        })
          .populate(
            "sender",
            "name"
          )
          .sort({
            createdAt: 1,
          });

      res.json(messages);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {

  sendMessage,

  getMessages,
};