import Message from "@permadeath/messages/dist/Message";
import { MessageTypes } from "@permadeath/messages/dist/types";
import { RedisClientType } from "@redis/client";
import { EntitysById } from "../../Zone/types/EntityCollections";
import Zone from "../../Zone/Zone";

export default function handOffDepartingEntitiesToNeighbor(
  departingEntities: EntitysById,
  zoneId: string,
  zone: Zone,
  publisher: RedisClientType
) {
  let entityId: string;
  for (entityId in departingEntities) {
    const currEntity = departingEntities[entityId];
    // @todo: send write request to db about this entity's location
    publisher.publish(`zone-${zoneId}`, JSON.stringify(new Message(MessageTypes.ENTITY_HANDOFF, currEntity)));
    delete zone.entities.mobile[entityId];
  }
}
