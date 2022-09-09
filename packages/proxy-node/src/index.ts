const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server });
const keys = require("./keys");
import { Message, MessageTypes, packMessage, unpackMessage, unpackZone } from "../../messages";
import { WebSocket } from "ws";
import { proxyToClientBroadcastRate, Zone } from "../../game";

const zones: { [key: string]: Zone } = {};
let broadcastInterval: NodeJS.Timer;

const redis = require("redis");

const subscriber = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000,
});

(async () => {
  await subscriber.connect();
  await subscriber.subscribe("zone-updates", (message: string) => {
    const updatedZone = unpackMessage(message);
    zones[updatedZone.id] = updatedZone;
  });
})();

wss.on("connection", (socket: WebSocket) => {
  console.log("player client connected to proxy node");
  broadcastInterval = setInterval(() => {
    socket.send(packMessage(new Message(MessageTypes.ALL_ZONES_COMPLETE, zones)));
  }, proxyToClientBroadcastRate);
});

server.listen(port, () => console.log(process.env.MY_POD_NAME + " listening on " + port));
