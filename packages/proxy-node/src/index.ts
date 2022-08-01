require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server });
import { WebSocket } from "ws";
const dns = require("node:dns");
const ZONE_NODE_WS_ADDRESS =
  "ws://zone-node-headless-service.zone-node-stateful-set-0:5001";

setInterval(
  () =>
    dns.lookup(
      "zone-node-headless-service",
      { all: true },
      (err: any, addresses: any) => {
        console.log(addresses);
      }
    ),
  1000
);

const connectToZoneNode = (address: string) => {
  const ws = new WebSocket(address);
  let pingTimeout: NodeJS.Timeout;
  ws.onopen = (event: any) => {
    console.log("connected to zone node");
    setInterval(() => ws.send("test message from proxy node"), 1000);
  };
  ws.onerror = (error) => {
    console.log(error);
  };
  ws.onclose = (e) => {
    clearTimeout(pingTimeout);
    console.log("connection terminated, reconnecting...");
    setTimeout(() => connectToZoneNode(ZONE_NODE_WS_ADDRESS), 6000);
  };
};

wss.on("connection", (socket: any) => {
  console.log("player client connected to proxy node");
  socket.on("message", (data: any) => {
    console.log(data.toString());
    socket.send("message from proxy node");
  });
});

// connectToZoneNode(ZONE_NODE_WS_ADDRESS);
server.listen(port, () => console.log("listening on " + port));
