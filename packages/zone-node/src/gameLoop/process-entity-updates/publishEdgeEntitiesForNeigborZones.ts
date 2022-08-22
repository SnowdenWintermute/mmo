import Message from "@permadeath/messages/dist/Message";
import { MessageTypes } from "@permadeath/messages/dist/types";
import { RedisClientType } from "@redis/client";
import { EntitysById } from "../../Zone/types/EntityCollections";
import Zone from "../../Zone/Zone";

export default function publishEdgeEntitiesForNeigborZones(
  entitiesOfInterest: EntitysById,
  zoneId: string,
  zone: Zone,
  publisher: RedisClientType
) {
  publisher.publish(
    `zone-${zoneId}`,
    JSON.stringify(new Message(MessageTypes.EDGE_ENTITY_UPDATE, { fromZoneId: zone.id, entities: entitiesOfInterest }))
  );
}
