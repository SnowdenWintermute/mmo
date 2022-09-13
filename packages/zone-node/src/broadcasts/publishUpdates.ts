import { RedisClientType } from "@redis/client";
import Matter from "matter-js";
import { CardinalOrdinalDirection, EntitiesByZoneId, Zone } from "../../../game/src";
import broadcastZoneUpdate from "./broadcastZoneUpdate";
import getCurrentDepartingQueue from "./getCurrentDepartingQueue";
import handOffDepartingEntitiesToNeighbor from "./handOffDepartingEntitiesToNeighbor";
import publishEdgeEntitiesForNeighbor from "./publishEdgeEntitiesForNeighbor";

export default function publishUpdates(publisher: RedisClientType, zone: Zone, engine: Matter.Engine) {
  broadcastZoneUpdate(zone, publisher);
  // we only want the most recent update for edge entities
  const edgeEntitiesForNeighborZones = zone.queues.outgoingEdgeEntityUpdates.pop();
  // separate the current queue from the zone in case it gets new entries while we're looping
  const departingEntityUpdates: EntitiesByZoneId[] = getCurrentDepartingQueue(zone);
  let direction: keyof typeof CardinalOrdinalDirection;
  for (direction in zone.neighboringZonesByDirection) {
    for (const neighborZoneId in zone.neighboringZonesByDirection[direction]) {
      handOffDepartingEntitiesToNeighbor(neighborZoneId, zone, departingEntityUpdates, engine, publisher);
      if (edgeEntitiesForNeighborZones)
        publishEdgeEntitiesForNeighbor(neighborZoneId, zone, edgeEntitiesForNeighborZones, publisher);
    }
  }
}
