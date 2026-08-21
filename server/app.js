const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Campus Skill Exchange API Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "API Working Successfully",
  });
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ======================
// SOCKET.IO
// ======================

const users = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // REGISTER USER
  socket.on("register", (userId) => {

  users[userId] = socket.id;

  console.log(
    "Registered:",
    userId,
    socket.id
  );

  io.emit(
    "onlineUsers",
    Object.keys(users)
  );

});

  // SEND MESSAGE
  socket.on("sendMessage", (data) => {
    console.log("Message:", data);

    const receiverSocket =
      users[data.receiver];

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "receiveMessage",
        data
      );
    }
  });

  socket.on("disconnect", () => {

  for (const userId in users) {

    if (users[userId] === socket.id) {

      delete users[userId];

      break;
    }
  }

  io.emit(
    "onlineUsers",
    Object.keys(users)
  );

});
socket.on("typing", (data) => {

  const receiverSocket =
    users[data.receiver];

  if (receiverSocket) {

    io.to(receiverSocket).emit(
      "userTyping",
      {
        sender: data.sender,
      }
    );
  }
});
});

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
}); 