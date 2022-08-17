import { Rectangle } from "@permadeath/game/dist/base/Rectangle";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import rectangleBorderingDirection, { BorderDirection } from "./rectangleBorderingDirection";

interface ZoneNeighborList {
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
  north: BorderDirection.south,
  south: BorderDirection.north,
  east: BorderDirection.west,
  west: BorderDirection.east,
  northEast: BorderDirection.southWest,
  southWest: BorderDirection.northEast,
  northWest: BorderDirection.southEast,
  southEast: BorderDirection.northWest,
};

export default function determineZoneNeighbors(zones: { [key: string]: Zone }) {
  const zoneNeighborList: ZoneNeighborList = {};
  const zonesAlreadyFullyCompared: string[] = [];

  for (const zoneId in zones) {
    const zone = zones[zoneId];
    if (!zoneNeighborList.hasOwnProperty(zoneId)) zoneNeighborList[zoneId] = {};
    const territory = zone.territory.current;
    const currRect = new Rectangle(territory.origin, territory.width, territory.height);

    for (const otherZoneId in zones) {
      if (otherZoneId === zoneId || zonesAlreadyFullyCompared.includes(otherZoneId)) continue;
      const otherZone = zones[otherZoneId];
      const comparingTerritory = otherZone.territory.current;
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
