import Message from "@permadeath/messages/dist/Message";
import { MessageTypes } from "@permadeath/messages/dist/types";
import { RedisClientType } from "@redis/client";
import { EntitiesByZoneId } from "@permadeath/game/dist/Zone/types/EntityCollections";
import Zone from "@permadeath/game/dist/Zone/Zone";

export default function handOffDepartingEntitiesToNeighbor(
  departingEntities: EntitiesByZoneId,
  zoneId: string,
  zone: Zone,
  publisher: RedisClientType
) {
  if (!departingEntities[zoneId]) return;
  let entityId: string;
  for (entityId in departingEntities[zoneId]) {
    const currEntity = departingEntities[zoneId][entityId];
    // @todo: send write request to db about this entity's location
    publisher.publish(`zone-${zoneId}`, JSON.stringify(new Message(MessageTypes.ENTITY_HANDOFF, currEntity)));
    delete zone.entities.agents[entityId];
  }
}
