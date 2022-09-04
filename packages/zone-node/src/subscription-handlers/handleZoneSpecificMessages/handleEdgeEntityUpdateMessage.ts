import { Message } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEdgeEntityUpdateMessage(parsedMessage: Message, zone: Zone) {
  const { zoneFromId, entities } = parsedMessage.data;
  zone.entities.unappliedEdgeUpdate[zoneFromId] = entities;
}
