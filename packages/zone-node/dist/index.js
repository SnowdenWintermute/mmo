"use strict";
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
console.log("zone node started");
wss.on("connection", (socket) => {
    console.log("a client connected");
    socket.on("message", (data) => {
        console.log(data.toString());
    });
});
app.get("/", (req, res) => res.send("hello from zone node"));
server.listen(port, () => console.log("listening on " + port));
