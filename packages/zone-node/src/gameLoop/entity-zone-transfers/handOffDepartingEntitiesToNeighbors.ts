import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { RedisClientType } from "@redis/client";
import Zone from "../../Zone/Zone";

export default function handOffDepartingEntitiesToNeighbors(
  departingEntitiesByDestination: {
    [zoneId: string]: { [id: string]: MobileEntity };
  },
  zone: Zone,
  publisher: RedisClientType
) {
  // send write request to db about this entity's location
  // delete this entity from the zone
  // publish to neighbor zone that they should take this entity
}
