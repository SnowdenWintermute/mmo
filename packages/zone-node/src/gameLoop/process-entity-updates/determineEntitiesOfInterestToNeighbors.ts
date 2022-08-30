import { Entity } from "@permadeath/game/dist/entities/Entity";
import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import { EntitiesByZoneId } from "../../Zone/types/EntityCollections";
import { DetailedRectangle } from "@permadeath/game/dist/base/Rectangles";
import Zone from "../../Zone/Zone";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";
import { Point } from "@permadeath/game/dist/base/Point";
import { playerMaxViewDistance } from "@permadeath/game";

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
