export class World {
  width: number;
  height: number;
  zoneMonitors: Object;
  //  zoneId
  //  origin
  //  dimensions
  //  borderingZoneIds
  //  numEntities
  //  numConnectedPlayers
  //  status: STABLE, MERGEABLE, MERGING, MERGE_COMPLETED, SPLIT_NEEDED, SPLITTING
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.zoneMonitors = {};
  }
  //  evaluateZones(this.zoneMonitors)
  //  tellZoneToSplit(zone1, aNewlyCreatedZone)
  //  tellZonesToMerge(zone, aBorderingZone)
  //  tellZoneToShutdown(zone)
  // should only merge if the combined workload could be handled by a single zone node
  //  onZoneConnection()
  //  onZoneDisconnect()
}
