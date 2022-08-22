"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const keys = require("./keys");
const redis = require("redis");
const consts_1 = require("@permadeath/game/dist/consts");
const createGameLoopInterval_1 = __importDefault(require("./gameLoop/createGameLoopInterval"));
const fillZoneWithTestMobileEntities_1 = __importDefault(require("./utils/fillZoneWithTestMobileEntities"));
const setUpZoneBasedOnPodId_1 = __importDefault(require("./Zone/setUpZoneBasedOnPodId"));
const handleZoneSpecificMessages_1 = __importDefault(require("./subscription-handlers/handleZoneSpecificMessages/handleZoneSpecificMessages"));
const handleProxiedClientRequests_1 = __importDefault(require("./subscription-handlers/handleProxiedClientRequests/handleProxiedClientRequests"));
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
(0, fillZoneWithTestMobileEntities_1.default)(50, zone);
const subscriber = publisher.duplicate();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield subscriber.connect();
    subscriber.subscribe(`zone-${zone.id}-proxied-client-requests`, (message) => (0, handleProxiedClientRequests_1.default)(message, zone));
    subscriber.subscribe(`zone-${zone.id}`, (message) => (0, handleZoneSpecificMessages_1.default)(message, zone));
    yield publisher.connect();
    broadcastInterval = setInterval(() => {
        publisher.publish("zone-updates", JSON.stringify(zone));
    }, consts_1.zoneToProxyBroadcastRate);
    gameLoopInterval = (0, createGameLoopInterval_1.default)(zone, publisher, consts_1.tickRate);
}))();
server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
