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
const fillZoneWithTestMobileEntities_1 = __importDefault(require("./utils/fillZoneWithTestMobileEntities"));
const Zone_1 = __importDefault(require("./Zone/Zone"));
let gameLoopInterval;
const connectedProxyNodes = {};
wss.on("connection", (socket) => {
    console.log("a client connected to this zone node");
    // loopClg(JSON.stringify(socket), 1000);
    socket.on("message", (data) => console.log(data.toString(), socket));
});
if (process.env.MY_POD_NAME) {
    const podName = process.env.MY_POD_NAME;
    const podId = parseInt(podName.replace(/\D/g, ""));
    const zone = new Zone_1.default(podId, new Point_js_1.Point(0, 0), 100, 100);
    console.log(`Zone ${podId} created`);
    (0, fillZoneWithTestMobileEntities_1.default)(5, zone);
    // gameLoopInterval = createGameLoopInterval(zone, tickRate);
}
server.listen(port, () => console.log("listening on " + port));
