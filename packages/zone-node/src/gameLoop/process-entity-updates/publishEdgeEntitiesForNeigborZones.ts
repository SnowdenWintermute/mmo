import Message from "@permadeath/messages/dist/Message";
import { MessageTypes } from "@permadeath/messages/dist/types";
import { RedisClientType } from "@redis/client";
import { EntitiesByZoneId } from "../../Zone/types/EntityCollections";
import Zone from "../../Zone/Zone";

export default function publishEdgeEntitiesForNeigborZones(
  entitiesOfInterest: EntitiesByZoneId,
  zoneId: string,
  zone: Zone,
  publisher: RedisClientType
) {
  let data = {};
  if (entitiesOfInterest[zoneId]) data = entitiesOfInterest[zoneId];
  publisher.publish(
    `zone-${zoneId}`,
    JSON.stringify(new Message(MessageTypes.EDGE_ENTITY_UPDATE, { zoneFromId: zone.id, entities: data }))
  );
}
