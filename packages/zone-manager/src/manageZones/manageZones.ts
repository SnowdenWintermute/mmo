import determineZoneNeighbors from "../determineZoneNeighbors/determineZoneNeighbors";
import Zone, { ZoneStatus } from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";
import createZoneNeighborIpList from "../createZoneNeighborIpList/createZoneNeighborIpList";
import publishZoneSpecificNeighborIps from "../publishZoneSpecificNeighborIps/publishZoneSpecificNeighborIps";

export default function manageZones(zones: { [key: string]: Zone }, publisher: RedisClientType) {
  const zoneNeighborList = determineZoneNeighbors(zones);
  const zoneNeighborIpList = createZoneNeighborIpList(zoneNeighborList, zones);
  console.log(zoneNeighborIpList);
  // broadcast on each zone's personal channel their specific list of neighbors and ips
  publishZoneSpecificNeighborIps(zoneNeighborIpList, publisher);
}
