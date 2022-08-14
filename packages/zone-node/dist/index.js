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
const redis = require("redis");
const keys = require("./keys");
const Point_js_1 = require("@permadeath/game/dist/base/Point.js");
const consts_1 = require("@permadeath/game/dist/consts");
const createGameLoopInterval_1 = __importDefault(require("./gameLoop/createGameLoopInterval"));
const fillZoneWithTestMobileEntities_1 = __importDefault(require("./utils/fillZoneWithTestMobileEntities"));
const Zone_1 = __importDefault(require("./Zone/Zone"));
let gameLoopInterval;
let broadcastInterval;
let zone;
const connectedProxyNodes = {};
const publisher = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: () => 1000,
});
if (process.env.MY_POD_NAME) {
    const podName = process.env.MY_POD_NAME;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const podId = parseInt(podName.replace(/\D/g, ""));
        zone = new Zone_1.default(podId, new Point_js_1.Point(podId * 300, 0), 300, 300);
        console.log(`Zone ${podId} created`);
        (0, fillZoneWithTestMobileEntities_1.default)(200, zone);
        gameLoopInterval = (0, createGameLoopInterval_1.default)(zone, consts_1.tickRate);
        yield publisher.connect();
        broadcastInterval = setInterval(() => {
            publisher.publish("zone-updates", JSON.stringify(zone));
        }, consts_1.zoneToProxyBroadcastRate);
    }))();
}
server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
