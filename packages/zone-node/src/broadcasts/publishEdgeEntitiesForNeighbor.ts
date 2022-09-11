import { Message, MessageTypes, packMessage } from "../../../messages";
import { EntitiesByZoneId, Zone } from "../../../game";
import { RedisClientType } from "@redis/client";

export default function publishEdgeEntitiesForNeighbor(
  zoneId: string,
  zone: Zone,
  edgeEntitiesForNeighborZones: EntitiesByZoneId | undefined,
  publisher: RedisClientType
) {
  let data = {};
  if (!edgeEntitiesForNeighborZones) return;
  if (edgeEntitiesForNeighborZones[zoneId]) data = edgeEntitiesForNeighborZones[zoneId];
  const packedMessage = packMessage(
    new Message(MessageTypes.EDGE_ENTITY_UPDATE, { zoneFromId: zone.id, entities: data })
  );
  publisher.publish(`zone-${zoneId}`, packedMessage);
}
