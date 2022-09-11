import {
  Point,
  playerMaxViewDistance,
  Entity,
  BehavioralEntity,
  DetailedRectangle,
  Zone,
  EntitiesByZoneId,
} from "../../../../game";
import entityIsInZoneExternalAreaOfInterest from "./entityIsInZoneExternalAreaOfInterest";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";

export default function considerAddingEntityToNeighborEdgeUpdate(
  currEntity: BehavioralEntity | Entity,
  zone: Zone,
  edgeEntitiesUpdateForNeighbors: EntitiesByZoneId
) {
  if (!entityIsOnZoneEdge(currEntity, zone)) return;
  let direction: keyof typeof zone.neighboringZonesByDirection;
  for (direction in zone.neighboringZonesByDirection) {
    for (const zoneId in zone.neighboringZonesByDirection[direction]) {
      // @ts-ignore
      const currZone = zone.neighboringZonesByDirection[direction][zoneId];
      const entityIsOnNeighborEdge: boolean = entityIsInZoneExternalAreaOfInterest(currEntity, currZone);
      if (entityIsOnNeighborEdge) {
        if (!edgeEntitiesUpdateForNeighbors.zoneId) edgeEntitiesUpdateForNeighbors[zoneId] = {};
        edgeEntitiesUpdateForNeighbors[zoneId][currEntity.id] = currEntity;
      }
    }
  }
}
