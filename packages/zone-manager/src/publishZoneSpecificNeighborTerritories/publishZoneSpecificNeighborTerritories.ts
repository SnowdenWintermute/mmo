import { RedisClientType } from "@redis/client";
import { MessageTypes } from "@permadeath/messages/dist/types";
import Message from "@permadeath/messages/dist/Message";
import { ZoneNeigborTerritoryList } from "../createZoneNeighborTerritoryList/createZoneNeighborTerritoryList";

export default function publishZoneSpecificNeighborIps(
  zoneNeigborTerritoryList: ZoneNeigborTerritoryList,
  publisher: RedisClientType
) {
  for (const zoneId in zoneNeigborTerritoryList) {
    const channel = `zone-${zoneId}`;
    const territoryListForZone = zoneNeigborTerritoryList[zoneId];
    const message = new Message(MessageTypes.ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST, territoryListForZone);
    publisher.publish(channel, JSON.stringify(message));
  }
}
