const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const redis = require("redis");
const keys = require("./keys");
import {
  tickRate,
  zoneToProxyBroadcastRate,
} from "@permadeath/game/dist/consts";
import createNewMobileEntityAtLocation from "./entity-creation/createMobileEntityAtLocation";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import setUpZoneBasedOnPodId from "./Zone/setUpZoneBasedOnPodId";
import Zone from "./Zone/Zone";

let gameLoopInterval: NodeJS.Timer;
let broadcastInterval: NodeJS.Timer;

const publisher = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
});

if (!process.env.MY_POD_NAME || !process.env.MY_POD_IP)
  throw new Error("environment variables for pod id and ip address not found");
const podName = process.env.MY_POD_NAME;
const podId = parseInt(podName.replace(/\D/g, ""));
const zone = setUpZoneBasedOnPodId(podId);
console.log(`Zone ${podId} created`);
fillZoneWithTestMobileEntities(10, zone);
gameLoopInterval = createGameLoopInterval(zone, tickRate);
const subscriber = publisher.duplicate();
subscriber.subscribe(
  `zone-${zone.id}-proxied-client-requests`,
  (message: string) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "create-mobile-entity-at-location")
      createNewMobileEntityAtLocation(zone, parsedMessage.data);
  }
);
publisher.connect();
broadcastInterval = setInterval(() => {
  publisher.publish("zone-updates", JSON.stringify(zone));
}, zoneToProxyBroadcastRate);

server.listen(port, () =>
  console.log(process.env.MY_POD_NAME + " listening on " + port)
);
