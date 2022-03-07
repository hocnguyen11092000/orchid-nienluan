const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];
const addNewUser = (username, socketId) => {
  onlineUsers.push({ username, socketId });
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  // console.log("có người kết nối");

  socket.on("user-go", (name) => {
    addNewUser(name, socket.id);
    // console.log(onlineUsers);
  });

  socket.on("send-status", ({ sender, reciver, status }) => {
    //const recivered = getUser(reciver);
    //console.log(recivered);
    const value = onlineUsers.find((user) => user.username == reciver);
    console.log(value);

    io.to(value?.socketId).emit("server-send-status", { status, onlineUsers });
  });

  socket.on("send-noti", (name) => {
    const user = onlineUsers.filter((item) => item.username === name);
    io.emit("data", user);
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnect ", socket.id);
  });
  socket.on("send-comment", (data) => {
    console.log(data);
    io.emit("server-send-comment", data);
  });

  //orchid
  socket.on("sendOrder", (data) => {
    io.emit("server", data);
  });
});

http.listen(5000, function () {
  console.log("listening on port 5000");
});
