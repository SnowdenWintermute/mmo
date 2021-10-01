const express = require("express");
const socketio = require("socket.io");
require("dotenv").config();
const messageHandler = require('./messageHandler/messageHandler')
const app = express();
const port = process.env.PORT;

// load game state for this zone
// start game loop
// queue receiving inputs
// queue outgoing packets

app.listen(port, () => console.log(`Zone node is running on port ${port}`));
const io = socketio(app);
io.sockets.on("connection",(socket: any)=>messageHandler(socket))