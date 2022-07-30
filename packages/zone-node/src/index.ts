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
const wss = new ws.Server({ server });
import { Point } from "@permadeath/game/dist/base/Point.js";
import { tickRate } from "@permadeath/game/dist/consts";
import { Entity } from "@permadeath/game/dist/entities/Entity";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import Zone from "./Zone/Zone";

let gameLoopInterval: NodeJS.Timer;
const connectedProxyNodes = {};

wss.on("connection", (socket: any) => {
  console.log("a client connected to this zone node");
  socket.on("message", (data: any) => console.log(data.toString()));
});

if (process.env.MY_POD_NAME) {
  const podName = process.env.MY_POD_NAME;
  const podId = parseInt(podName.replace(/\D/g, ""));
  const zone = new Zone(podId, new Point(0, 0), 100, 100);
  console.log(`Zone ${podId} created`);
  fillZoneWithTestMobileEntities(5, zone);
  gameLoopInterval = createGameLoopInterval(zone, tickRate);
}

server.listen(port, () => console.log("listening on " + port));

// const loopClg = () => {
//   setTimeout(() => {
//     console.log();
//     loopClg();
//   }, 1000);
// };
// loopClg();
