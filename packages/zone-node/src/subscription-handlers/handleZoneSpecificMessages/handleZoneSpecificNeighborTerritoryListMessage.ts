import Message from "@permadeath/messages/dist/Message";
import Zone from "../../Zone/Zone";

export default function handleZoneSpecificNeighborTerritoryListMessage(parsedMessage: Message, zone: Zone) {
  for (const direction in parsedMessage.data) {
    // @ts-ignore
    if (!zone.neighboringZones.hasOwnProperty(direction)) zone.neighboringZones[direction] = {};
    // @ts-ignore
    for (const zoneId in parsedMessage.data[direction]) {
      // @ts-ignore
      if (!zone.neighboringZones[direction].hasOwnProperty(zoneId)) zone.neighboringZones[direction][zoneId] = {};
      // @ts-ignore
      zone.neighboringZones[direction][zoneId].territory = parsedMessage.data[direction][zoneId];
    }
  }
}
