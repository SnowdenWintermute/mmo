const clonedeep = require("lodash.clonedeep");
import { RedisClientType } from "@redis/client";
import { Zone } from "../../../game/src";
import { packEntities } from "../../../messages";

export default function broadcastZoneUpdate(zone: Zone, publisher: RedisClientType) {
  const zoneToSend = clonedeep(zone);
  zoneToSend.entities.agents = packEntities(zone.entities.agents);
  for (const zoneId in zoneToSend.entities.edge)
    zoneToSend.entities.edge[zoneId] = packEntities(zone.entities.edge[zoneId]);
  zoneToSend.entities.unappliedEdgeUpdate = {};
  zoneToSend.entities.arriving = [];
  publisher.publish("zone-updates", JSON.stringify(zoneToSend));
}
