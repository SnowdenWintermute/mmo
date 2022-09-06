import { Message, unpackEntity } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEntityHandoffMessage(parsedMessage: Message, zone: Zone) {
  const arrivingEntity = parsedMessage.data;
  const unpackedEntity = unpackEntity(arrivingEntity);
  zone.entities.arriving.push(unpackedEntity);
}
