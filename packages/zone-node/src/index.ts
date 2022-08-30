const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const keys = require("./keys");
const redis = require("redis");
const Matter = require("matter-js");
import { tickRate, zoneToProxyBroadcastRate } from "@permadeath/game/dist/consts";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import setUpZoneBasedOnPodId from "./Zone/setUpZoneBasedOnPodId";
import handleZoneSpecificMessages from "./subscription-handlers/handleZoneSpecificMessages/handleZoneSpecificMessages";
// import handleProxiedClientRequests from "./subscription-handlers/handleProxiedClientRequests/handleProxiedClientRequests";

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
const engine = Matter.Engine.create();
fillZoneWithTestMobileEntities(50, zone, engine);
const subscriber = publisher.duplicate();

(async () => {
  await subscriber.connect();
  // subscriber.subscribe(`zone-${zone.id}-proxied-client-requests`, (message: string) =>
  //   // handleProxiedClientRequests(message, zone)
  // );
  subscriber.subscribe(`zone-${zone.id}`, (message: string) => handleZoneSpecificMessages(message, zone));
  await publisher.connect();
  broadcastInterval = setInterval(() => {
    publisher.publish("zone-updates", JSON.stringify(zone));
  }, zoneToProxyBroadcastRate);
  gameLoopInterval = createGameLoopInterval(zone, engine, publisher, tickRate);
})();

server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
