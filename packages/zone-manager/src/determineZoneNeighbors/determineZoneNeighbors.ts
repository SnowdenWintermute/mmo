import { Rectangle } from "@permadeath/game/dist/base/Rectangle";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { between } from "@permadeath/utils/dist/index";

enum Border {
  north = "north",
  south = "south",
  east = "east",
  west = "west",
  northEast = "northEast",
  northWest = "northWest",
  southEast = "southEast",
  southWest = "southWest",
}

const borderOpposites = {
  north: Border.south,
  south: Border.north,
  east: Border.west,
  west: Border.east,
  northEast: Border.southWest,
  southWest: Border.northEast,
  northWest: Border.southEast,
  southEast: Border.northWest,
};

interface ZoneNeighborList {
  [id: string]: {
    north?: { [id: string]: { ip: string } } | null;
    south?: { [id: string]: { ip: string } } | null;
    east?: { [id: string]: { ip: string } } | null;
    west?: { [id: string]: { ip: string } } | null;
    northEast?: { [id: string]: { ip: string } } | null;
    northWest?: { [id: string]: { ip: string } } | null;
    southEast?: { [id: string]: { ip: string } } | null;
    southWest?: { [id: string]: { ip: string } } | null;
  };
}

export default function determineZoneNeighbors(zones: { [key: string]: Zone }) {
  const zoneNeighborList: ZoneNeighborList = {};
  const zonesAlreadyFullyCompared: string[] = [];
  for (const zoneId in zones) {
    const zone = zones[zoneId];
    zoneNeighborList[zoneId] = {};
    const territory = zone.territory.current;
    const currRect = new Rectangle(territory.origin, territory.width, territory.height);
    console.log(zonesAlreadyFullyCompared);
    for (const otherZoneId in zones) {
      let border: Border | null = null;
      const otherZone = zones[otherZoneId];
      if (otherZoneId !== zoneId && !zonesAlreadyFullyCompared.includes(otherZoneId)) {
        const comparingTerritory = otherZone.territory.current;
        const otherRect = new Rectangle(comparingTerritory.origin, comparingTerritory.width, comparingTerritory.height);
        if (
          currRect.origin.y - 1 === otherRect.bottomY &&
          (between(currRect.origin.x, otherRect.bottomLeftCorner.x, otherRect.bottomRightCorner.x) ||
            between(currRect.topRightCorner.x, otherRect.bottomLeftCorner.x, otherRect.bottomRightCorner.x))
        )
          border = Border.north;
        else if (
          currRect.bottomY + 1 === otherRect.topY &&
          (between(currRect.bottomLeftCorner.x, otherRect.origin.x, otherRect.topRightCorner.x) ||
            between(currRect.bottomRightCorner.x, otherRect.origin.x, otherRect.topRightCorner.x))
        )
          border = Border.south;
        else if (
          currRect.rightX + 1 === otherRect.leftX &&
          (between(currRect.topRightCorner.y, otherRect.origin.y, otherRect.bottomLeftCorner.y) ||
            between(currRect.bottomRightCorner.y, otherRect.origin.y, otherRect.bottomLeftCorner.y))
        )
          border = Border.east;
        else if (
          currRect.leftX - 1 === otherRect.rightX &&
          (between(currRect.origin.y, otherRect.topRightCorner.y, otherRect.bottomRightCorner.y) ||
            between(currRect.bottomLeftCorner.y, otherRect.topRightCorner.y, otherRect.bottomRightCorner.y))
        )
          border = Border.west;
        else if (
          currRect.topRightCorner.x + 1 === otherRect.bottomLeftCorner.x &&
          currRect.topRightCorner.y - 1 === otherRect.bottomLeftCorner.y
        )
          border = Border.northEast;
        else if (
          currRect.origin.x - 1 === otherRect.bottomRightCorner.x &&
          currRect.origin.y - 1 === otherRect.bottomRightCorner.y
        )
          border = Border.northWest;
        else if (
          currRect.bottomRightCorner.x + 1 === otherRect.origin.x &&
          currRect.bottomRightCorner.y + 1 === otherRect.origin.y
        )
          border = Border.southEast;
        else if (
          currRect.bottomLeftCorner.x - 1 === otherRect.topRightCorner.x &&
          currRect.bottomLeftCorner.y + 1 === otherRect.topRightCorner.y
        )
          border = Border.southWest;
      }
      // console.log("border: " + border);
      if (border) {
        if (zoneNeighborList[zoneId]?.hasOwnProperty(border))
          zoneNeighborList[zoneId][border] = {
            ...zoneNeighborList[zoneId][border],
            [otherZoneId]: { ip: otherZone.ip },
          };
        else
          zoneNeighborList[zoneId][border] = {
            [otherZoneId]: { ip: otherZone.ip },
          };
        const oppositeBorder = borderOpposites[border];
        if (!zoneNeighborList[otherZoneId]) zoneNeighborList[otherZoneId] = {};
        if (zoneNeighborList[otherZoneId]?.hasOwnProperty(oppositeBorder))
          zoneNeighborList[otherZoneId][oppositeBorder] = {
            ...zoneNeighborList[otherZoneId][oppositeBorder],
            [zoneId]: { ip: zone.ip },
          };
        else
          zoneNeighborList[otherZoneId][oppositeBorder] = {
            [zoneId]: { ip: zone.ip },
          };
      }
    }
    zonesAlreadyFullyCompared.push(zoneId);
  }
  // console.log(zoneNeighborList);
  return zoneNeighborList;
}
