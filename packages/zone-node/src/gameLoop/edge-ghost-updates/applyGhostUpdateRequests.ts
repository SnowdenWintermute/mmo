import { Zone } from "../../../../game";
import applyUpdateToEntity from "../entity-zone-transfers/applyUpdateToEntity";

export default function applyGhostUpdateRequests(zone: Zone) {
  const currentQueue = [];
  const queueLength = zone.queues.incomingGhostUpdateRequests.length;
  for (let i = 0; i < queueLength; i++) {
    const currUpdate = zone.queues.incomingGhostUpdateRequests.shift();
    if (!currUpdate) continue;
    const { entities, zoneFromId } = currUpdate;
    for (const entityId in entities) {
      if (zone.entities.agents[entityId]) applyUpdateToEntity(zone.entities.agents[entityId], entities[entityId]);
      else if (zone.entities.static[entityId]) applyUpdateToEntity(zone.entities.static[entityId], entities[entityId]);
    }
  }
}
