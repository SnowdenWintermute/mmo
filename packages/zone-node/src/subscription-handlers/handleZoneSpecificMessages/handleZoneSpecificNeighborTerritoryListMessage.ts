import { Message } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleZoneSpecificNeighborTerritoryListMessage(parsedMessage: Message, zone: Zone) {
  for (const direction in parsedMessage.data) {
    // @ts-ignore
    if (!zone.neighboringZonesByDirection.hasOwnProperty(direction)) zone.neighboringZonesByDirection[direction] = {};
    // @ts-ignore
    for (const zoneId in parsedMessage.data[direction]) {
      // @ts-ignore
      if (!zone.neighboringZonesByDirection[direction].hasOwnProperty(zoneId))
        // @ts-ignore
        zone.neighboringZonesByDirection[direction][zoneId] = {};
      // @ts-ignore
      zone.neighboringZonesByDirection[direction][zoneId].territory = parsedMessage.data[direction][zoneId];
    }
  }
}
