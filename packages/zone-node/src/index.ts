const keys = require("./keys");
const redis = require("redis");
import { tickRate, zoneToProxyBroadcastRate } from "../../game";
import createGameLoopInterval from "./gameLoop/createGameLoopInterval";
import fillZoneWithTestMobileEntities from "./utils/fillZoneWithTestMobileEntities";
import setUpZoneBasedOnPodId from "./utils/setUpZoneBasedOnPodId";
import handleZoneSpecificMessages from "./subscription-handlers/handleZoneSpecificMessages";
import createMatterEngine from "./utils/createMatterEngine";
import broadcastZoneUpdate from "./broadcasts/broadcastZoneUpdate";
import publishUpdates from "./broadcasts/publishUpdates";
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
const engine = createMatterEngine();
fillZoneWithTestMobileEntities(1, zone, engine);
const subscriber = publisher.duplicate();

(async () => {
  await subscriber.connect();
  subscriber.subscribe(`zone-${zone.id}`, (message: string) => handleZoneSpecificMessages(message, zone));
  await publisher.connect();
  gameLoopInterval = createGameLoopInterval(zone, engine, tickRate);
  broadcastInterval = setInterval(() => publishUpdates(publisher, zone, engine), zoneToProxyBroadcastRate);
})();
