const clonedeep = require("lodash.clonedeep");
import { RedisClientType } from "@redis/client";
import { Zone } from "../../../game/src";
import { packZone } from "../../../messages";

export default function broadcastZoneUpdate(zone: Zone, publisher: RedisClientType) {
  const zoneToSend = clonedeep(zone);
  zoneToSend.entities.unappliedEdgeUpdate = {};
  zoneToSend.entities.arriving = [];
  const packedMessage = JSON.stringify(packZone(zoneToSend));
  publisher.publish("zone-updates", packedMessage);
}
