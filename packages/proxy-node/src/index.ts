require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server });
import { WebSocket } from "ws";
const dns = require("node:dns");
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { proxyToClientBroadcastRate } from "@permadeath/game/dist/consts";

const zones: { [key: string]: Zone } = {};
const broadcastRate = 500;
let broadcastInterval: NodeJS.Timer;

const connectToZoneNode = (address: string) => {
  const ws = new WebSocket(address);
  let pingTimeout: NodeJS.Timeout;
  ws.onopen = (event: any) => {
    console.log("connected to zone node");
    ws.send("test message from proxy node");
  };
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data.toString());
    zones[data.id] = data;
    // console.log(zones[0].entities.mobile["1"].pos);
  };
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
  broadcastInterval = setInterval(() => {
    socket.send(JSON.stringify(zones));
  }, proxyToClientBroadcastRate);
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
