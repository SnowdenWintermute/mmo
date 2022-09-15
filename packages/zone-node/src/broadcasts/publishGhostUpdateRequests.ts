import { Message, MessageTypes, packMessage } from "../../../messages";
import { EntitiesByZoneId, Zone } from "../../../game";
import { RedisClientType } from "@redis/client";

export default function publishGhostUpdateRequests(
  zoneId: string,
  zone: Zone,
  ghostUpdateRequests: EntitiesByZoneId[] | undefined,
  publisher: RedisClientType
) {
  if (!ghostUpdateRequests) return;
  for (const update in ghostUpdateRequests) {
    const data = ghostUpdateRequests[update][zoneId];
    if (!data) return;
    const packedMessage = packMessage(
      new Message(MessageTypes.GHOST_ENTITY_UPDATE_REQUEST, { zoneFromId: zone.id, entities: data })
    );
    publisher.publish(`zone-${zoneId}`, packedMessage);
  }
}
