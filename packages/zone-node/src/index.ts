require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const redis = require("redis");
const { add } = require("@permadeath/message-types");
const keys = require("./keys");
console.log(add(1, 2, 3));
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

const publisher = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

if (process.env.MY_POD_NAME) {
  const podName = process.env.MY_POD_NAME;
  (async () => {
    const podId = parseInt(podName.replace(/\D/g, ""));
    zone = new Zone(podId, new Point(podId * 300, 0), 300, 300);
    console.log(`Zone ${podId} created`);
    fillZoneWithTestMobileEntities(200, zone);
    gameLoopInterval = createGameLoopInterval(zone, tickRate);

    const article = {
      id: "123456",
      name: "Using Redis Pub/Sub with Node.js",
      blog: "Logrocket Blog",
    };
    await publisher.connect();
    broadcastInterval = setInterval(
      publisher.publish("zone-update", JSON.stringify(zone)),
      zoneToProxyBroadcastRate
    );
  })();
}
server.listen(port, () => console.log("listening on " + port));
