import { Point } from "@permadeath/game/dist/base/Point";

enum mergeOrSplitStatus {
  STABLE = "STABLE",
  MERGEABLE = "MERGEABLE",
  MERGING = "MERGING",
  MERGE_COMPLETED = "MERGE_COMPLETED",
  SPLIT_NEEDED = "SPLIT_NEEDED",
  SPLITTING = "SPLITTING",
}

export class ZoneMonitor {
  zoneId: number;
  origin: Point;
  width: number;
  height: number;
  borderingZoneIds: {
    north: number | null;
    south: number | null;
    east: number | null;
    west: number | null;
    northEast: number | null;
    northWest: number | null;
    southEast: number | null;
    southWest: number | null;
  };
  numOwnedEntities: number | null;
  numConnectedPlayers: number | null;
  mergeOrSplitStatus: mergeOrSplitStatus;
  constructor(
    zoneId: number,
    origin: Point,
    width: number,
    height: number,
    borderingZoneIds: Object
  ) {
    this.zoneId = zoneId;
    this.origin = origin;
    this.width = width;
    this.height = height;
    this.borderingZoneIds = borderingZoneIds;
    this.numOwnedEntities = null;
    this.numConnectedPlayers = null;
    this.mergeOrSplitStatus = mergeOrSplitStatus.STABLE;
  }
}
