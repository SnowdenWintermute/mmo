require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server });
const inputHandler = require("./inputHandler/inputHandler");

// load game state for this zone
// start game loop
// queue receiving inputs
// queue outgoing packets
wss.on("connection", (socket: any) => {
  socket.on("message", (event: any) => {
    console.log(event.toString());
  });
});

server.listen(port, () => console.log("listening on " + port));
