const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require("axios");
// parse application/json
app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

let count = 0;

app.use(express.static("./build/"));

// SERVER LISTENING
const server = app.listen(1337, () => {
  console.log("Server restarted...");
});

const io = require("socket.io")(server);

io.on("connection", function(socket) {
  //2
  count++;
  console.log("CONNECTED TO CLIENT SOCKET");
  socket.emit("greeting", { msg: "You have connected to socket server" }); //3
  updateConnectedUsers();
  socket.on("thankyou", function(data) {
    //7
    console.log("SOCKET.ON thankyou");
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
  socket.on("disconnect", () => {
    count--;
    updateConnectedUsers();
  });
});

const updateConnectedUsers = () => {
  io.emit("usercountchanged", { count: count }); //3
};
const getUpdatedItemList = message => {
  axios.get("http://5c9bca575ee0830014b71895.mockapi.io/products").then(resp => {
    io.emit("itemchanged", { msg: message, items: resp.data }); //3
  });
};

app.get("/products", (request, response) => {
  axios.get("http://5c9bca575ee0830014b71895.mockapi.io/products").then(resp => {
    response.json(resp.data);
  });
});
app.get("/products/:id", (request, response) => {
  axios.get(`http://5c9bca575ee0830014b71895.mockapi.io/products/${request.params.id}`).then(resp => {
    response.json(resp.data);
  });
});

app.delete("/products/:id", (request, response) => {
  axios.delete(`http://5c9bca575ee0830014b71895.mockapi.io/products/${request.params.id}`).then(resp => {
    getUpdatedItemList("Someone Deleted and Item");
    response.json(resp.data);
  });
});

app.post("/products", (request, response) => {
  axios.post("http://5c9bca575ee0830014b71895.mockapi.io/products", request.body).then(resp => {
    getUpdatedItemList("Someone Created an Item");
    response.json(resp.data);
  });
});

app.put("/products/:id", (request, response) => {
  axios.put(`http://5c9bca575ee0830014b71895.mockapi.io/products/${request.params.id}`, request.body).then(resp => {
    getUpdatedItemList("Someone updated an item");
    response.json(resp.data);
  });
});
