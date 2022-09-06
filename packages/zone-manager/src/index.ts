const redis = require("redis");
const keys = require("./keys");
import { Zone } from "../../game";
import { RedisClientType } from "@redis/client";
import manageZones from "./manageZones/manageZones";
import { unpackEntities } from "../../messages";

const zones: { [id: string]: Zone } = {};
let zoneManagementInterval: NodeJS.Timer;

const publisher: RedisClientType = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
});

(async () => {
  const subscriber = publisher.duplicate();
  await subscriber.connect();
  await subscriber.subscribe("zone-updates", (message: string) => {
    const updatedZone = JSON.parse(message);
    updatedZone.entities.agents = unpackEntities(updatedZone.entities.agents);
    zones[updatedZone.id] = updatedZone;
  });
  await publisher.connect();
  zoneManagementInterval = setInterval(() => {
    manageZones(zones, publisher);
  }, 3000);
})();
