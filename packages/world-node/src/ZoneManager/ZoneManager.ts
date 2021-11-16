export class ZoneManager {
  worldWidth: number;
  worldHeight: number;
  zoneMonitors: Object;
  constructor(width: number, height: number) {
    this.worldWidth = width;
    this.worldHeight = height;
    this.zoneMonitors = {};
  }
  //  evaluateZones(this.zoneMonitors)
  //  tellZoneToSplit(zone1, aNewlyCreatedZone)
  //  tellZonesToMerge(zone, aBorderingZone)
  //    - only merge adjacent zones
  //    - should only merge if the combined workload could be handled by a single zone node
  //  tellZoneToShutdown(zone)
  //  onZoneConnection()
  //  onZoneDisconnect()
}
