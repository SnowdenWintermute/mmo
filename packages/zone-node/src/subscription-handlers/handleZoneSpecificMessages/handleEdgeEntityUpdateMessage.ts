import { Message, unpackEntities, unpackMessage } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEdgeEntityUpdateMessage(message: Message, zone: Zone) {
  const { zoneFromId, entities } = message.data;
  zone.entities.unappliedEdgeUpdate[zoneFromId] = entities;
}
