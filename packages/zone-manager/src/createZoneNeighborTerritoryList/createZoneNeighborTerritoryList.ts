import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { ZoneNeighborList } from "../determineZoneNeighbors/determineZoneNeighbors";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { Territory } from "@permadeath/zone-node/dist/Zone/types/Territory";

export interface ZoneNeigborTerritoryList {
  [id: string]: {
    north?: { [zoneId: string]: Territory };
    south?: { [zoneId: string]: Territory };
    east?: { [zoneId: string]: Territory };
    west?: { [zoneId: string]: Territory };
    northEast?: { [zoneId: string]: Territory };
    northWest?: { [zoneId: string]: Territory };
    southEast?: { [zoneId: string]: Territory };
    southWest?: { [zoneId: string]: Territory };
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
