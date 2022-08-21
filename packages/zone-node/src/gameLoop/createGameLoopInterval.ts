import { RedisClientType } from "@redis/client";
import Zone from "../Zone/Zone";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import handOffDepartingEntitiesToNeighbors from "./entity-zone-transfers/handOffDepartingEntitiesToNeighbors";
import moveEntitiesAndDetermineZoneDepartures from "./process-entity-updates/moveEntitiesAndDetermineZoneDepartures";

export default (zone: Zone, publisher: RedisClientType, tickRate: number) => {
  return setInterval(() => {
    const departingEntitiesByDestination = moveEntitiesAndDetermineZoneDepartures(zone);
    handOffDepartingEntitiesToNeighbors(departingEntitiesByDestination, zone, publisher);
    addArrivingEntitiesToZone(zone);
  }, tickRate);
};
