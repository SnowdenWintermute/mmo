import {
  Point,
  playerMaxViewDistance,
  Entity,
  BehavioralEntity,
  DetailedRectangle,
  Zone,
  EntitiesByZoneId,
} from "../../../../game";
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
      const { origin, width, height } = zone.neighboringZonesByDirection[direction][zoneId].territory;
      const externalAreaOfInterest = new DetailedRectangle(
        new Point(origin.x - playerMaxViewDistance, origin.y - playerMaxViewDistance),
        width + playerMaxViewDistance * 2,
        height + playerMaxViewDistance * 2
      );
      if (externalAreaOfInterest.containsPoint(currEntity.body.position)) {
        if (!edgeEntitiesUpdateForNeighbors.hasOwnProperty(zoneId)) edgeEntitiesUpdateForNeighbors[zoneId] = {};
        edgeEntitiesUpdateForNeighbors[zoneId][currEntity.id] = currEntity;
      }
    }
  }
}
