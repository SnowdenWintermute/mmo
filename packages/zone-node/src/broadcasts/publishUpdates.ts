import { RedisClientType } from "@redis/client";
import Matter from "matter-js";
import { CardinalOrdinalDirection, EntitiesByZoneId, Zone } from "../../../game/src";
import broadcastZoneUpdate from "./broadcastZoneUpdate";
import handOffDepartingEntitiesToNeighbor from "./handOffDepartingEntitiesToNeighbor";
import publishEdgeEntitiesForNeighbor from "./publishEdgeEntitiesForNeighbor";

export default function publishUpdates(publisher: RedisClientType, zone: Zone, engine: Matter.Engine) {
  broadcastZoneUpdate(zone, publisher);
  // we only want the most recent update for edge entities
  const edgeEntitiesForNeighborZones = zone.queues.outgoingEdgeEntityUpdates.pop();
  const departingEntityUpdates: EntitiesByZoneId[] = [];
  const departingQueueLength = zone.queues.departingEntities.length;
  for (let i = 0; i < departingQueueLength; i++) {
    const update = zone.queues.departingEntities.pop();
    if (update) departingEntityUpdates.push(update);
  }

  let direction: keyof typeof CardinalOrdinalDirection;
  for (direction in zone.neighboringZonesByDirection) {
    for (const neighborZoneId in zone.neighboringZonesByDirection[direction]) {
      handOffDepartingEntitiesToNeighbor(neighborZoneId, zone, departingEntityUpdates, engine, publisher);
      publishEdgeEntitiesForNeighbor(neighborZoneId, zone, edgeEntitiesForNeighborZones, publisher);
    }
  }
}
