// const port = process.env.PORT;
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
const redis = require("redis");
const keys = require("./keys");

import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";
import manageZones from "./manageZones/manageZones";

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
    zones[updatedZone.id] = updatedZone;
  });
  await publisher.connect();
  zoneManagementInterval = setInterval(() => {
    manageZones(zones, publisher);
  }, 3000);
})();

// server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
