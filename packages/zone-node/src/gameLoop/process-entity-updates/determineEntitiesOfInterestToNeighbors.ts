import { Entity } from "@permadeath/game/dist/entities/Entity";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { EntitiesByZoneId } from "../../Zone/types/EntityCollections";
import { DetailedRectangle } from "@permadeath/game/dist/base/Rectangles";
import Zone from "../../Zone/Zone";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";

export default function determineEntitiesOfInterestToNeighbors(
  currEntity: MobileEntity | Entity,
  zone: Zone,
  entitiesOfInterestToNeighbors: EntitiesByZoneId
) {
  if (!entityIsOnZoneEdge(currEntity, zone)) return;
  let direction: keyof typeof zone.neighboringZones;
  for (direction in zone.neighboringZones) {
    for (const zoneId in zone.neighboringZones[direction]) {
      // @ts-ignore
      const { origin, width, height } = zone.neighboringZones[direction][zoneId].territory;
      const externalAreaOfInterest = new DetailedRectangle(origin, width, height);
      if (externalAreaOfInterest.containsPoint(currEntity.pos)) {
        if (!entitiesOfInterestToNeighbors.hasOwnProperty(zoneId)) entitiesOfInterestToNeighbors[zoneId] = {};
        entitiesOfInterestToNeighbors[zoneId][currEntity.id] = currEntity;
      }
    }
  }
}
