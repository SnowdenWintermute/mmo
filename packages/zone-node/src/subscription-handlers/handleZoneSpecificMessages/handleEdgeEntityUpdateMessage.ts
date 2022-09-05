import { Message, unpackEntities } from "../../../../messages";
import { Zone } from "../../../../game";

export default function handleEdgeEntityUpdateMessage(parsedMessage: Message, zone: Zone) {
  const { zoneFromId, entities } = parsedMessage.data;
  const unpackedEntities = unpackEntities(entities);
  zone.entities.unappliedEdgeUpdate[zoneFromId] = unpackedEntities;
}
