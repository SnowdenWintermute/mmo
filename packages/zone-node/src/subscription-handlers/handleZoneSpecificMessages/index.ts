import { MessageTypes, unpackMessage } from "../../../../messages";
import { Zone } from "../../../../game";
import handleZoneSpecificNeighborTerritoryListMessage from "./handleZoneSpecificNeighborTerritoryListMessage";

export default function handleZoneSpecificMessages(message: string, zone: Zone) {
  const parsedMessage = unpackMessage(message);
  const { type } = parsedMessage;
  const { queues } = zone;
  if (type === MessageTypes.ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST)
    return handleZoneSpecificNeighborTerritoryListMessage(parsedMessage, zone);
  if (type === MessageTypes.ENTITY_HANDOFF) return queues.arrivingEntities.push(parsedMessage.data);
  if (type === MessageTypes.EDGE_ENTITY_UPDATE) return queues.incomingEdgeEntityUpdates.push(parsedMessage.data);
  if (type === MessageTypes.GHOST_ENTITY_UPDATE_REQUEST)
    return queues.incomingGhostUpdateRequests.push(parsedMessage.data);
}
