import { RedisClientType } from "@redis/client";
import Zone from "../Zone/Zone";
import handOffDepartingEntitiesToNeighbors from "./entity-zone-transfers/handOffDepartingEntitiesToNeighbors";
import moveMobs from "./move-entities/moveMobs";

export default (zone: Zone, publisher: RedisClientType, tickRate: number) => {
  return setInterval(() => {
    moveMobs(zone);
    handOffDepartingEntitiesToNeighbors(zone, publisher);
  }, tickRate);
};
