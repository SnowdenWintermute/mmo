require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server });
import { WebSocket } from "ws";
const dns = require("node:dns");

const connectToZoneNode = (address: string) => {
  const ws = new WebSocket(address);
  let pingTimeout: NodeJS.Timeout;
  ws.onopen = (event: any) => {
    console.log("connected to zone node");
    ws.send("test message from proxy node");
  };
  ws.onmessage = (message) => console.log(message.data);
  ws.onerror = (error) => {
    console.log(error);
  };
  ws.onclose = (e) => {
    clearTimeout(pingTimeout);
    console.log("connection terminated, reconnecting...");
    setTimeout(() => connectToZoneNode(address), 6000);
  };
};

wss.on("connection", (socket: any) => {
  console.log("player client connected to proxy node");
  socket.on("message", (data: any) => {
    console.log(data.toString());
    socket.send("message from proxy node");
  });
});

dns.lookup(
  "zone-node-headless-service",
  { all: true },
  (err: any, addresses: any) => {
    console.log(addresses);
    addresses.forEach((addressAndFamily: any) => {
      let zoneNodeIp: string;
      zoneNodeIp = addressAndFamily.address;
      if (zoneNodeIp) connectToZoneNode(`ws://${zoneNodeIp}`);
    });
  }
);
server.listen(port, () => console.log("listening on " + port));
