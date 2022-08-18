import { RedisClientType } from "@redis/client";
import Zone from "../../Zone/Zone";
import determineDepartingEntities from "./determineDepartingEntities";

export default function handOffDepartingEntitiesToNeighbors(zone: Zone, publisher: RedisClientType) {
  // check each mob to see if it left the zone
  const departingEntities = determineDepartingEntities(zone);
  // if yes, determine which bordering zone it entered
  // send write request to db about this entity's location
  // delete this entity from the zone
  // publish to neighbor zone that they should take this entity
}
