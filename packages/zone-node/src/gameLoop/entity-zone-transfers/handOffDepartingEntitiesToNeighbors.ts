import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import Message from "@permadeath/messages/dist/Message";
import { MessageTypes } from "@permadeath/messages/dist/types";
import { RedisClientType } from "@redis/client";
import Zone from "../../Zone/Zone";
const cloneDeep = require("lodash.clonedeep");

export default function handOffDepartingEntitiesToNeighbors(
  departingEntitiesByDestination: {
    [zoneId: string]: { [id: string]: MobileEntity };
  },
  zone: Zone,
  publisher: RedisClientType
) {
  let zoneId: string;
  for (zoneId in departingEntitiesByDestination) {
    let entityId: string;
    for (entityId in departingEntitiesByDestination[zoneId]) {
      const currEntity = departingEntitiesByDestination[zoneId][entityId];
      // const sendableEntity = cloneDeep(currEntity);
      publisher.publish(`zone-${zoneId}`, JSON.stringify(new Message(MessageTypes.ENTITY_HANDOFF, currEntity)));
      delete departingEntitiesByDestination[zoneId][entityId];
      delete zone.entities.mobile[entityId];
    }
  }
  // send write request to db about this entity's location
  // delete this entity from the zone
  // publish to neighbor zone that they should take this entity
}
