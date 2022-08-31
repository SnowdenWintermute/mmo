import Message from "@permadeath/messages/dist/Message";
import Zone from "@permadeath/game/dist/Zone/Zone";

export default function handleEdgeEntityUpdateMessage(parsedMessage: Message, zone: Zone) {
  const { zoneFromId, entities } = parsedMessage.data;
  zone.entities.unappliedEdgeUpdate[zoneFromId] = entities;
}
