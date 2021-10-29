"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputHandler = (socket) => {
    console.log("Client connected ", socket);
    socket.on("message", (text) => {
        console.log("Message from client " + text);
    });
};
module.exports = inputHandler;
