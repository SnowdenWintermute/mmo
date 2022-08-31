import Message from "@permadeath/messages/dist/Message";
import Zone from "@permadeath/game/dist/Zone/Zone";

export default function handleEntityHandoffMessage(parsedMessage: Message, zone: Zone) {
  const arrivingEntity = parsedMessage.data;
  zone.entities.arriving.push(arrivingEntity);
}
