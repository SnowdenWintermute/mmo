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
// const { Point } = require("@permadeath/game");
import { Point } from "@permadeath/game/dist/base/Point.js";
// const { Entity } = require("@permadeath/game");
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
// const Zone = require("./Zone/Zone");
import Zone from "./Zone/Zone";

wss.on("connection", (socket: any) => {
  console.log("a client connected to this zone node");
  socket.on("message", (data: any) => {
    console.log(data.toString());
  });
});

// if (process.env.MY_POD_NAME) {
//   const podName = process.env.MY_POD_NAME;
//   const podId = parseInt(podName.replace(/\D/g, ""));
//   // const zone = new Zone(podId, new Point(0, 0), 100, 100);
const loopClg = () => {
  setTimeout(() => {
    // console.log(podId);
    console.log(add(1, 2, 3));
    console.log(new Zone(1, new Point(0, 0), 100, 100));
    console.log(new Entity("testEntity", new Point(0, 0), 10));
    console.log(Point);
    console.log();
    loopClg();
  }, 1000);
};
loopClg();
// console.log("ay");
// console.log(add(1, 2, 3));
// }

server.listen(port, () => console.log("listening on " + port));
