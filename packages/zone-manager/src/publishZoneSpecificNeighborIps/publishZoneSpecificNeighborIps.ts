import { RedisClientType } from "@redis/client";
import { MessageTypes } from "@permadeath/message-types/dist/index";
import { ZoneNeigborTerritoryList } from "../createZoneNeighborTerritoryList/createZoneNeighborTerritoryList";

export default function publishZoneSpecificNeighborIps(
  zoneNeigborTerritoryList: ZoneNeigborTerritoryList,
  publisher: RedisClientType
) {
  for (const zoneId in zoneNeigborTerritoryList) {
    const channel = `zone-${zoneId}`;
    const territoryListForZone = zoneNeigborTerritoryList[zoneId];
    const message = { type: MessageTypes.ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST, data: territoryListForZone };
    publisher.publish(channel, JSON.stringify(message));
  }
}
