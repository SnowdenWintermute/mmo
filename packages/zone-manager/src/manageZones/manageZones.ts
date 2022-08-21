import determineZoneNeighbors from "../determineZoneNeighbors/determineZoneNeighbors";
import Zone, { ZoneStatus } from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";
import createZoneNeighborTerritoryList from "../createZoneNeighborTerritoryList/createZoneNeighborTerritoryList";
import publishZoneSpecificNeighborTerritories from "../publishZoneSpecificNeighborTerritories/publishZoneSpecificNeighborTerritories";

export default function manageZones(zones: { [key: string]: Zone }, publisher: RedisClientType) {
  const zoneNeighborList = determineZoneNeighbors(zones);
  const zoneNeighborTerritoryList = createZoneNeighborTerritoryList(zoneNeighborList, zones);
  publishZoneSpecificNeighborTerritories(zoneNeighborTerritoryList, publisher);
}
