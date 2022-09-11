import { Message, MessageTypes, packEntity, packMessage } from "../../../messages";
import { EntitiesByZoneId, Zone } from "../../../game";
import { RedisClientType } from "@redis/client";
import Matter from "matter-js";

export default function handOffDepartingEntitiesToNeighbor(
  neighborZoneId: string,
  zone: Zone,
  departingEntityUpdates: EntitiesByZoneId[],
  engine: Matter.Engine,
  publisher: RedisClientType
) {
  departingEntityUpdates.forEach((update) => {
    if (!update[neighborZoneId]) return;
    let entityId: string;
    for (entityId in update[neighborZoneId]) {
      const currEntity = update[neighborZoneId][entityId];
      // @todo: send write request to db about this entity's location
      const packedMessage = packMessage(new Message(MessageTypes.ENTITY_HANDOFF, currEntity));
      publisher.publish(`zone-${neighborZoneId}`, packedMessage);
    }
  });
}
