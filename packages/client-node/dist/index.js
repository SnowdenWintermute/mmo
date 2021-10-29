"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const handleSocketConnection = (ws) => ws.addEventListener("open", (event) => {
    console.log("connected to zone node");
    const pingServer = () => {
        setTimeout(() => {
            console.log("pinging...");
            ws.send("hello from client");
            pingServer();
        }, 1000);
    };
    pingServer();
    ws.send("whatup");
    ws.onclose = (e) => {
        console.log("connection terminated, reconnecting...");
        setTimeout(() => handleSocketConnection(new ws_1.WebSocket("ws://localhost:5001")), 1000);
    };
});
handleSocketConnection(new ws_1.WebSocket("ws://localhost:5001"));
