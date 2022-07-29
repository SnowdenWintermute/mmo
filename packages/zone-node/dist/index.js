"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const Point_js_1 = require("@permadeath/game/dist/base/Point.js");
const consts_1 = require("@permadeath/game/dist/consts");
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const fillZoneWithTestEntities_1 = __importDefault(require("./utils/fillZoneWithTestEntities"));
const Zone_1 = __importDefault(require("./Zone/Zone"));
wss.on("connection", (socket) => {
    console.log("a client connected to this zone node");
    socket.on("message", (data) => {
        console.log(data.toString());
    });
});
if (process.env.MY_POD_NAME) {
    const podName = process.env.MY_POD_NAME;
    const podId = parseInt(podName.replace(/\D/g, ""));
    const zone = new Zone_1.default(podId, new Point_js_1.Point(0, 0), 100, 100);
    console.log("Zone created");
    (0, fillZoneWithTestEntities_1.default)(zone);
    setInterval(() => {
        for (const mob in zone.entities) {
            if (typeof zone.entities[mob] === typeof MobileEntity_1.MobileEntity)
                zone.entities[mob].move();
        }
    }, consts_1.tickRate);
    console.log(zone);
}
server.listen(port, () => console.log("listening on " + port));
// const loopClg = () => {
//   setTimeout(() => {
//     console.log();
//     loopClg();
//   }, 1000);
// };
// loopClg();
