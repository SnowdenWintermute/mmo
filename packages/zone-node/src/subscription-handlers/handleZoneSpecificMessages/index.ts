import { MessageTypes, unpackMessage } from "../../../../messages";
import { Zone } from "../../../../game";
import handleEdgeEntityUpdateMessage from "./handleEdgeEntityUpdateMessage";
import handleEntityHandoffMessage from "./handleEntityHandoffMessage";
import handleZoneSpecificNeighborTerritoryListMessage from "./handleZoneSpecificNeighborTerritoryListMessage";

export default function handleZoneSpecificMessages(message: string, zone: Zone) {
  const parsedMessage = unpackMessage(message);
  const { type } = parsedMessage;
  if (type === MessageTypes.ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST)
    return handleZoneSpecificNeighborTerritoryListMessage(parsedMessage, zone);
  if (type === MessageTypes.ENTITY_HANDOFF) return handleEntityHandoffMessage(parsedMessage, zone);
  if (type === MessageTypes.EDGE_ENTITY_UPDATE) return handleEdgeEntityUpdateMessage(parsedMessage, zone);
}
