import { Point, playerMaxViewDistance, Entity, BehavioralEntity, DetailedRectangle, Zone } from "../../../../game";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";

export default function determineEntitiesOfInterestToNeighbors(currEntity: BehavioralEntity | Entity, zone: Zone) {
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
        if (!zone.entities.ofInterestToNeighbors.hasOwnProperty(zoneId))
          zone.entities.ofInterestToNeighbors[zoneId] = {};
        zone.entities.ofInterestToNeighbors[zoneId][currEntity.id] = currEntity;
      }
    }
  }
}
