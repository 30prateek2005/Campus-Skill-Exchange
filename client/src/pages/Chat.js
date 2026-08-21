import { useEffect, useState, useRef } from "react";
import "../styles/Chat.css";
import io from "socket.io-client";


import axios from "axios";
const socket = io("http://localhost:5000");
function Chat() {
  const [onlineUsers, setOnlineUsers] =
  useState([]);
  const [typingUser, setTypingUser] =
  useState("");
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  useEffect(() => {

  socket.on(
    "userTyping",
    () => {

      setTypingUser(
        "Typing..."
      );

      setTimeout(() => {

        setTypingUser("");

      }, 2000);
    }
  );

  return () => {

    socket.off(
      "userTyping"
    );

  };

}, []);

useEffect(() => {

  socket.emit(
    "register",
    currentUserId
  );

  console.log(
    "Registered User:",
    currentUserId
  );

  fetchUsers();

}, []);
  useEffect(() => {

  socket.on(
    "receiveMessage",
    (data) => {

      setMessages(
        (prev) => [
          ...prev,
          {
            _id: Date.now(),
            sender: data.sender,
            message: data.message,
            createdAt: new Date(),
          },
        ]
      );
    }
  );

  return () => {
    socket.off(
      "receiveMessage"
    );
  };

}, []);
useEffect(() => {

  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
  

}, [messages]);
useEffect(() => {

  socket.on(
    "onlineUsers",
    (users) => {

      setOnlineUsers(users);

    }
  );

  return () => {

    socket.off(
      "onlineUsers"
    );

  };

}, []);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      const filteredUsers = res.data.filter(
        (user) => user._id !== currentUserId
      );

      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMessages = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    loadMessages(user._id);
  };

  const sendMessage =
  async () => {

    if (
      !message ||
      !selectedUser
    )
      return;

    try {

      await axios.post(
        "http://localhost:5000/api/messages",
        {
          receiver:
            selectedUser._id,
          message,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      socket.emit(
        "sendMessage",
        {
          sender:
            currentUserId,

          receiver:
            selectedUser._id,

          message,
        }
      );

     setMessages((prev) => [
  ...prev,
  {
    _id: Date.now(),
    sender: {
      name: "You",
    },
    message,
    createdAt: new Date(),
  },
]);

      setMessage("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    
  <div className="chat-container">
      {/* LEFT SIDEBAR */}
      <div className="users-panel">
        <div className="users-header">
  Users
</div>

        {users.map((user) => (
          <div
  key={user._id}
  className="user-item"
  onClick={() => selectUser(user)}
>
           <span>

  {
    onlineUsers.includes(
      user._id
    )
      ? "🟢 "
      : "⚫ "
  }

  {user.name}

</span>
          </div>
        ))}
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="chat-panel">
        {selectedUser ? (
          <>
            <div className="chat-header">
  {selectedUser.name}
</div>
{typingUser && (
  <div
    style={{
      padding: "5px 20px",
      color: "green",
      fontSize: "14px",
    }}
  >
    {typingUser}
  </div>
)}
<div className="messages-container">
              {messages.map((msg) => {

  const isMe =
    msg.sender?._id === currentUserId ||
    msg.sender === currentUserId ||
    msg.sender?.name === "You";

  return (

    <div
      key={msg._id}
      className={`message ${
        isMe
          ? "sent"
          : "received"
      }`}
    >

      <div className="message-bubble">

  <div>
    {msg.message}
  </div>

  <small
    style={{
      display: "block",
      marginTop: "5px",
      fontSize: "11px",
      opacity: 0.7,
      textAlign: "right",
    }}
  >
    {msg.createdAt
      ? new Date(
          msg.createdAt
        ).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : ""}
  </small>

</div>

    </div>
  );
})}
<div ref={messagesEndRef}></div>
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => {

  setMessage(
    e.target.value
  );

  if (selectedUser) {

    socket.emit(
      "typing",
      {
        sender:
          currentUserId,

        receiver:
          selectedUser._id,
      }
    );
  }
}}
                placeholder="Type message..."
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 20px",
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "24px",
    color: "#666",
  }}
>
  Select a user to start chatting 💬
</div>     
        )}
      </div>
    </div>
  );
}

export default Chat;