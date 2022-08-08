require("dotenv").config();
const dns = require("dns");
const port = process.env.PORT;
const express = require("express");
const axios = require("axios");
const app = express();
const server = require("http").createServer(app);
const { add } = require("@permadeath/message-types");
console.log(add(1, 2, 3));
const ws = require("ws");
const wss = new ws.Server({ server }, { clientTracking: true });
import WebSocket from "ws";
import { loopClg } from "@permadeath/utils/dist";
import { Point } from "@permadeath/game/dist/base/Point.js";
import {
  tickRate,
  zoneToProxyBroadcastRate,
} from "@permadeath/game/dist/consts";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import Zone from "./Zone/Zone";

let gameLoopInterval: NodeJS.Timer;
let broadcastInterval: NodeJS.Timer;
let zone: Zone;
const connectedProxyNodes = {};

wss.on("connection", (socket: WebSocket) => {
  console.log("a proxy connected to this zone node");
  broadcastInterval = setInterval(() => {
    wss.clients.forEach((client: WebSocket) => {
      client.send(JSON.stringify(zone));
    });
  }, zoneToProxyBroadcastRate);
});

if (process.env.MY_POD_NAME) {
  const podName = process.env.MY_POD_NAME;
  const podId = parseInt(podName.replace(/\D/g, ""));
  zone = new Zone(podId, new Point(0, 0), 100, 100);
  console.log(`Zone ${podId} created`);
  fillZoneWithTestMobileEntities(100, zone);
  gameLoopInterval = createGameLoopInterval(zone, tickRate);
}

server.listen(port, () => console.log("listening on " + port));
