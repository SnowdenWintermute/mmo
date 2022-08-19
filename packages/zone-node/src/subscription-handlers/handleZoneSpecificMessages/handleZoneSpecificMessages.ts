import { MessageTypes } from "@permadeath/message-types/dist";
import Zone from "../../Zone/Zone";

export default function handleZoneSpecificMessages(message: string, zone: Zone) {
  const parsedMessage = JSON.parse(message);
  if (parsedMessage.type === MessageTypes.ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST) {
    for (let direction in parsedMessage.data) {
      // @ts-ignore
      zone.neighboringZones[direction] = parsedMessage.data[direction];
    }
  }
  // if (zone.id === 1) console.log(JSON.stringify(zone.neighboringZones));
}
