import { Message, unpackEntities, unpackMessage } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEdgeEntityUpdateMessage(message: Message, zone: Zone) {
  zone.queues.incomingEdgeEntityUpdates.push(message.data);
}
