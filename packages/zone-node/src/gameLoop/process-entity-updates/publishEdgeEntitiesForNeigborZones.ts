import { Message, MessageTypes, packEntities } from "../../../../messages";
import { EntitiesByZoneId, Zone } from "../../../../game";
import { RedisClientType } from "@redis/client";

export default function publishEdgeEntitiesForNeigborZones(
  entitiesOfInterest: EntitiesByZoneId,
  zoneId: string,
  zone: Zone,
  publisher: RedisClientType
) {
  let data = {};
  if (entitiesOfInterest[zoneId]) data = packEntities(entitiesOfInterest[zoneId]);
  publisher.publish(
    `zone-${zoneId}`,
    JSON.stringify(new Message(MessageTypes.EDGE_ENTITY_UPDATE, { zoneFromId: zone.id, entities: data }))
  );
}
