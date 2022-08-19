import { Rectangle } from "@permadeath/game/dist/base/Rectangle";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import rectangleBorderingDirection from "./rectangleBorderingDirection";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";

export interface ZoneNeighborList {
  [id: string]: {
    north?: string[];
    south?: string[];
    east?: string[];
    west?: string[];
    northEast?: string[];
    northWest?: string[];
    southEast?: string[];
    southWest?: string[];
  };
}

const borderOpposites = {
  north: CardinalOrdinalDirection.south,
  south: CardinalOrdinalDirection.north,
  east: CardinalOrdinalDirection.west,
  west: CardinalOrdinalDirection.east,
  northEast: CardinalOrdinalDirection.southWest,
  southWest: CardinalOrdinalDirection.northEast,
  northWest: CardinalOrdinalDirection.southEast,
  southEast: CardinalOrdinalDirection.northWest,
};

export default function determineZoneNeighbors(zones: { [key: string]: Zone }) {
  const zoneNeighborList: ZoneNeighborList = {};
  const zonesAlreadyFullyCompared: string[] = [];

  for (const zoneId in zones) {
    const zone = zones[zoneId];
    if (!zoneNeighborList.hasOwnProperty(zoneId)) zoneNeighborList[zoneId] = {};
    const territory = zone.territory;
    const currRect = new Rectangle(territory.origin, territory.width, territory.height);

    for (const otherZoneId in zones) {
      if (otherZoneId === zoneId || zonesAlreadyFullyCompared.includes(otherZoneId)) continue;
      const otherZone = zones[otherZoneId];
      const comparingTerritory = otherZone.territory;
      const otherRect = new Rectangle(comparingTerritory.origin, comparingTerritory.width, comparingTerritory.height);
      const border = rectangleBorderingDirection(currRect, otherRect);
      if (!border) continue;

      if (zoneNeighborList[zoneId].hasOwnProperty(border)) zoneNeighborList[zoneId][border]?.push(otherZoneId);
      else zoneNeighborList[zoneId][border] = [otherZoneId];

      const oppositeBorder = borderOpposites[border];
      if (!zoneNeighborList.hasOwnProperty(otherZoneId)) zoneNeighborList[otherZoneId] = {};
      if (zoneNeighborList[otherZoneId].hasOwnProperty(oppositeBorder))
        zoneNeighborList[otherZoneId][oppositeBorder]?.push(zoneId);
      else zoneNeighborList[otherZoneId][oppositeBorder] = [zoneId];
    }
    zonesAlreadyFullyCompared.push(zoneId);
  }

  return zoneNeighborList;
}
