import { Point } from "@permadeath/game/dist/base/Point";
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

interface ZoneNeighborList {
  [id: string]: {
    north: { [id: string]: { ip: string } } | null;
    south: { [id: string]: { ip: string } } | null;
    east: { [id: string]: { ip: string } } | null;
    west: { [id: string]: { ip: string } } | null;
    northEast: { [id: string]: { ip: string } } | null;
    northWest: { [id: string]: { ip: string } } | null;
    southEast: { [id: string]: { ip: string } } | null;
    southWest: { [id: string]: { ip: string } } | null;
  };
}

export default function determineZoneNeighbors(zones: { [key: string]: Zone }) {
  const zoneNeighborList: ZoneNeighborList = {};

  for (const zoneId in zones) {
    const currZone = zones[zoneId];
    zoneNeighborList[currZone.id] = {
      north: {},
      south: {},
      east: {},
      west: {},
      northEast: {},
      northWest: {},
      southEast: {},
      southWest: {},
    };
    const territory = currZone.territory.current;
    const currRect = new Rectangle(territory.origin, territory.width, territory.height);
    for (const otherZoneId in zones) {
      let border: Border | null = null;
      const comparingZone = zones[otherZoneId];
      if (otherZoneId !== zoneId && !zoneNeighborList.hasOwnProperty(zoneId)) {
        const comparingTerritory = comparingZone.territory.current;
        const otherRect = new Rectangle(comparingTerritory.origin, comparingTerritory.width, comparingTerritory.height);

        // NORTH BORDER
        if (
          currRect.origin.y - 1 === otherRect.bottomY &&
          (between(currRect.origin.x, otherRect.bottomLeftCorner.x, otherRect.bottomRightCorner.x) ||
            between(currRect.topRightCorner.x, otherRect.bottomLeftCorner.x, otherRect.bottomRightCorner.x))
        )
          border = Border.north;
        // SOUTH BORDER
        else if (
          currRect.bottomY + 1 === otherRect.topY &&
          (between(currRect.bottomLeftCorner.x, otherRect.origin.x, otherRect.topRightCorner.x) ||
            between(currRect.bottomRightCorner.x, otherRect.origin.x, otherRect.topRightCorner.x))
        )
          border = Border.south;
      }
      if (border)
        zoneNeighborList[zoneId][border] = {
          ...zoneNeighborList[zoneId][border],
          [otherZoneId]: { ip: comparingZone.ip },
        };
    }
  }
  return zoneNeighborList;
}
