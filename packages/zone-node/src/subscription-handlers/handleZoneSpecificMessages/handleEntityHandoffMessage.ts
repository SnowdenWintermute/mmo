import { Message, unpackEntity } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEntityHandoffMessage(parsedMessage: Message, zone: Zone) {
  const arrivingEntity = parsedMessage.data;
  zone.entities.arriving.push(arrivingEntity);
}
