import { RedisClientType } from "@redis/client";
import Matter from "matter-js";
import { CardinalOrdinalDirection, Zone } from "../../../game/src";
import broadcastZoneUpdate from "./broadcastZoneUpdate";
import handOffDepartingEntitiesToNeighbor from "./handOffDepartingEntitiesToNeighbor";
import publishEdgeEntitiesForNeigborZones from "./publishEdgeEntitiesForNeigborZones";

export default function publishUpdates(publisher: RedisClientType, zone: Zone, engine: Matter.Engine) {
  broadcastZoneUpdate(zone, publisher);
  let direction: keyof typeof CardinalOrdinalDirection;
  for (direction in zone.neighboringZonesByDirection) {
    for (const zoneId in zone.neighboringZonesByDirection[direction]) {
      handOffDepartingEntitiesToNeighbor(zoneId, zone, engine, publisher);
      publishEdgeEntitiesForNeigborZones(zoneId, zone, publisher);
    }
  }
}
