import {
  Point,
  playerMaxViewDistance,
  EntitiesByZoneId,
  Entity,
  BehavioralEntity,
  DetailedRectangle,
  Zone,
} from "../../../../game";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";

export default function determineEntitiesOfInterestToNeighbors(
  currEntity: BehavioralEntity | Entity,
  zone: Zone,
  entitiesOfInterestToNeighbors: EntitiesByZoneId
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
        if (!entitiesOfInterestToNeighbors.hasOwnProperty(zoneId)) entitiesOfInterestToNeighbors[zoneId] = {};
        entitiesOfInterestToNeighbors[zoneId][currEntity.id] = currEntity;
      }
    }
  }
}
