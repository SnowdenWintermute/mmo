import determineZoneNeighbors from "../determineZoneNeighbors/determineZoneNeighbors";
import Zone, { ZoneStatus } from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";
import createZoneNeighborTerritoryList from "../createZoneNeighborTerritoryList/createZoneNeighborTerritoryList";
import publishZoneSpecificNeighborIps from "../publishZoneSpecificNeighborIps/publishZoneSpecificNeighborIps";

export default function manageZones(zones: { [key: string]: Zone }, publisher: RedisClientType) {
  const zoneNeighborList = determineZoneNeighbors(zones);
  const zoneNeighborIpList = createZoneNeighborTerritoryList(zoneNeighborList, zones);
  publishZoneSpecificNeighborIps(zoneNeighborIpList, publisher);
}
