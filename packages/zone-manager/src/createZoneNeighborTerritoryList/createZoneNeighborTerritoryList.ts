import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { ZoneNeighborList } from "../determineZoneNeighbors/determineZoneNeighbors";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { Rectangle } from "@permadeath/game/dist/base/Rectangles";

export interface ZoneNeigborTerritoryList {
  [id: string]: {
    north?: { [zoneId: string]: Rectangle };
    south?: { [zoneId: string]: Rectangle };
    east?: { [zoneId: string]: Rectangle };
    west?: { [zoneId: string]: Rectangle };
    northEast?: { [zoneId: string]: Rectangle };
    northWest?: { [zoneId: string]: Rectangle };
    southEast?: { [zoneId: string]: Rectangle };
    southWest?: { [zoneId: string]: Rectangle };
  };
}

export default function createZoneNeighborTerritoryList(
  zoneNeighborList: ZoneNeighborList,
  zones: { [key: string]: Zone }
) {
  const zoneNeighborTerritoryList: ZoneNeigborTerritoryList = {};

  for (const zoneId in zoneNeighborList) {
    zoneNeighborTerritoryList[zoneId] = {};
    let border: keyof typeof CardinalOrdinalDirection;
    for (border in zoneNeighborList[zoneId]) {
      zoneNeighborTerritoryList[zoneId][border] = {};
      zoneNeighborList[zoneId][border]!.forEach((borderingZoneId) => {
        zoneNeighborTerritoryList[zoneId][border]![borderingZoneId] = zones[borderingZoneId].territory;
      });
    }
  }
  return zoneNeighborTerritoryList;
}
