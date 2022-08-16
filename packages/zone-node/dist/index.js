"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const redis = require("redis");
const keys = require("./keys");
const consts_1 = require("@permadeath/game/dist/consts");
const createMobileEntityAtLocation_1 = __importDefault(require("./entity-creation/createMobileEntityAtLocation"));
const createGameLoopInterval_1 = __importDefault(require("./gameLoop/createGameLoopInterval"));
const fillZoneWithTestMobileEntities_1 = __importDefault(require("./utils/fillZoneWithTestMobileEntities"));
const setUpZoneBasedOnPodId_1 = __importDefault(require("./Zone/setUpZoneBasedOnPodId"));
let gameLoopInterval;
let broadcastInterval;
const publisher = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: () => 1000,
});
if (!process.env.MY_POD_NAME || !process.env.MY_POD_IP)
    throw new Error("environment variables for pod id and ip address not found");
const podName = process.env.MY_POD_NAME;
const podId = parseInt(podName.replace(/\D/g, ""));
const zone = (0, setUpZoneBasedOnPodId_1.default)(podId);
console.log(`Zone ${podId} created`);
(0, fillZoneWithTestMobileEntities_1.default)(10, zone);
gameLoopInterval = (0, createGameLoopInterval_1.default)(zone, consts_1.tickRate);
const subscriber = publisher.duplicate();
subscriber.subscribe(`zone-${zone.id}-proxied-client-requests`, (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "create-mobile-entity-at-location")
        (0, createMobileEntityAtLocation_1.default)(zone, parsedMessage.data);
});
publisher.connect();
broadcastInterval = setInterval(() => {
    publisher.publish("zone-updates", JSON.stringify(zone));
}, consts_1.zoneToProxyBroadcastRate);
server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
