const keys = require("./keys");
const redis = require("redis");
const Matter = require("matter-js");
import { tickRate, zoneToProxyBroadcastRate } from "../../game";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import setUpZoneBasedOnPodId from "./utils/setUpZoneBasedOnPodId";
import handleZoneSpecificMessages from "./subscription-handlers/handleZoneSpecificMessages/handleZoneSpecificMessages";
import { packEntities } from "../../messages";
// import handleProxiedClientRequests from "./subscription-handlers/handleProxiedClientRequests/handleProxiedClientRequests";
const clonedeep = require("lodash.clonedeep");

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
engine.gravity.y = 0;
engine.gravity.x = 0;
engine.gravityScale = 0;

fillZoneWithTestMobileEntities(2, zone, engine);
const subscriber = publisher.duplicate();

(async () => {
  await subscriber.connect();
  // subscriber.subscribe(`zone-${zone.id}-proxied-client-requests`, (message: string) =>
  //   // handleProxiedClientRequests(message, zone)
  // );
  subscriber.subscribe(`zone-${zone.id}`, (message: string) => handleZoneSpecificMessages(message, zone));
  await publisher.connect();
  broadcastInterval = setInterval(() => {
    const zoneToSend = clonedeep(zone);
    zoneToSend.entities.agents = packEntities(zone.entities.agents);
    for (const zoneId in zoneToSend.entities.edge)
      zoneToSend.entities.edge[zoneId] = packEntities(zone.entities.edge[zoneId]);
    zoneToSend.entities.unappliedEdgeUpdate = {};
    zoneToSend.entities.arriving = [];
    publisher.publish("zone-updates", JSON.stringify(zoneToSend));
  }, zoneToProxyBroadcastRate);
  gameLoopInterval = createGameLoopInterval(zone, engine, publisher, tickRate);
})();
