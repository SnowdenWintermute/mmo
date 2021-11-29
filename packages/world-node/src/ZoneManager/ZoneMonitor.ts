import { Point } from "@permadeath/game/src/base/Point";
import { Territory } from "@permadeath/zone-node/src/Zone/types/Territory";
import { DirectionalIdList } from "./types/DirectionalIdList";

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
  territory: Territory;
  borderingZoneIds: DirectionalIdList;
  numOwnedEntities: number | null;
  numConnectedPlayers: number | null;
  mergeOrSplitStatus: mergeOrSplitStatus;
  constructor(
    zoneId: number,
    origin: Point,
    width: number,
    height: number,
    borderingZoneIds: DirectionalIdList
  ) {
    this.zoneId = zoneId;
    this.territory = {
      origin: origin,
      width: width,
      height: height,
    };
    this.borderingZoneIds = borderingZoneIds;
    this.numOwnedEntities = null;
    this.numConnectedPlayers = null;
    this.mergeOrSplitStatus = mergeOrSplitStatus.STABLE;
  }
}
