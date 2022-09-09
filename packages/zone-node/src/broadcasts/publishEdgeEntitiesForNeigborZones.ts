import { Message, MessageTypes, packEntities, packMessage } from "../../../messages";
import { EntitiesByZoneId, Zone } from "../../../game";
import { RedisClientType } from "@redis/client";

export default function publishEdgeEntitiesForNeigborZones(zoneId: string, zone: Zone, publisher: RedisClientType) {
  const { ofInterestToNeighbors } = zone.entities;
  let data = {};
  if (ofInterestToNeighbors[zoneId]) data = ofInterestToNeighbors[zoneId];
  const packedMessage = packMessage(
    new Message(MessageTypes.EDGE_ENTITY_UPDATE, { zoneFromId: zone.id, entities: data })
  );
  publisher.publish(`zone-${zoneId}`, packedMessage);
}
