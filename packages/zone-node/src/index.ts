const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const redis = require("redis");
const keys = require("./keys");
import { Point } from "@permadeath/game/dist/base/Point.js";
import {
  tickRate,
  zoneToProxyBroadcastRate,
} from "@permadeath/game/dist/consts";
import createNewMobileEntityAtLocation from "./entity-creation/createMobileEntityAtLocation";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import Zone from "./Zone/Zone";

let gameLoopInterval: NodeJS.Timer;
let broadcastInterval: NodeJS.Timer;
let zone: Zone;

const publisher = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
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
    const subscriber = publisher.duplicate();
    await subscriber.subscribe(
      `zone-${zone.id}-proxied-client-requests`,
      (message: string) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "create-mobile-entity-at-location")
          createNewMobileEntityAtLocation(zone, parsedMessage.data);
      }
    );
    await publisher.connect();
    broadcastInterval = setInterval(() => {
      publisher.publish("zone-updates", JSON.stringify(zone));
    }, zoneToProxyBroadcastRate);
  })();
}
server.listen(port, () =>
  console.log(process.env.MY_POD_NAME + " listening on " + port)
);
