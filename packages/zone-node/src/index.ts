require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { add } = require("@permadeath/message-types");
console.log("zone node started");

const ws = require("ws");
const wss = new ws.Server({ server });

wss.on("connection", (socket: any) => {
  console.log("a client connected");
  socket.on("message", (data: any) => {
    console.log(add(1, 2, 3));
    console.log(data.toString());
  });
});

app.get("/", (req: any, res: any) => res.send("hello from zone node"));

server.listen(port, () => console.log("listening on " + port));
