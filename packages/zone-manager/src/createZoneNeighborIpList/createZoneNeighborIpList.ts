import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { ZoneNeighborList } from "../determineZoneNeighbors/determineZoneNeighbors";
import { BorderDirection } from "../determineZoneNeighbors/rectangleBorderingDirection";

export interface ZoneNeighborIpList {
  [id: string]: {
    north?: { [zoneId: string]: string };
    south?: { [zoneId: string]: string };
    east?: { [zoneId: string]: string };
    west?: { [zoneId: string]: string };
    northEast?: { [zoneId: string]: string };
    northWest?: { [zoneId: string]: string };
    southEast?: { [zoneId: string]: string };
    southWest?: { [zoneId: string]: string };
  };
}

export default function createZoneNeighborIpList(zoneNeighborList: ZoneNeighborList, zones: { [key: string]: Zone }) {
  const zoneNeigborIpList: ZoneNeighborIpList = {};

  for (const zoneId in zoneNeighborList) {
    zoneNeigborIpList[zoneId] = {};
    let border: keyof typeof BorderDirection;
    for (border in zoneNeighborList[zoneId]) {
      zoneNeigborIpList[zoneId][border] = {};
      zoneNeighborList[zoneId][border]!.forEach((borderingZoneId) => {
        zoneNeigborIpList[zoneId][border]![borderingZoneId] = zones[zoneId].ip;
      });
    }
  }
  return zoneNeigborIpList;
}
