import { Message, MessageTypes, packEntity } from "../../../../messages";
import { EntitiesByZoneId, Zone } from "../../../../game";
import { RedisClientType } from "@redis/client";

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
    const packedEntity = packEntity(currEntity);
    publisher.publish(`zone-${zoneId}`, JSON.stringify(new Message(MessageTypes.ENTITY_HANDOFF, packedEntity)));
    delete zone.entities.agents[entityId];
  }
}
