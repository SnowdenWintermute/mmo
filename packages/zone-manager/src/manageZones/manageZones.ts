import determineZoneNeighbors from "../determineZoneNeighbors/determineZoneNeighbors";
import Zone, { ZoneStatus } from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";

export default function manageZones(zones: { [key: string]: Zone }, client: RedisClientType) {
  const zoneNeighborList = determineZoneNeighbors(zones);
  console.log(zoneNeighborList);
  // assign ip addresses to the neighbor list
  // broadcast on each zone's personal channel their specific list of neighbors and ips
}
