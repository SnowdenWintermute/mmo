import { EntitiesByZoneId, Zone, createDestinationSeekerBT } from "../../../game";
import Matter from "matter-js";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import considerAddingEntityToNeighborEdgeUpdate from "./neighbor-entity-update-creators/considerAddingEntityToNeighborEdgeUpdate";
import applyEdgeEntitiesUpdate from "./entity-zone-transfers/applyEdgeEntitiesUpdate";
import executeEntityBehaviors from "./entity-behavior-execution/executeEntityBehaviors";
import predictEdgeEntityBehaviors from "./entity-behavior-execution/predictEdgeEntityBehaviors";
import handlePotentialZoneDeparture from "./neighbor-entity-update-creators/handlePotentialZoneDeparture";
import applyGhostUpdateRequests from "./edge-ghost-updates/applyGhostUpdateRequests";
const cloneDeep = require("lodash.clonedeep");

export default (zone: Zone, engine: Matter.Engine, tickRate: number) => {
  const blackboard = { entity: zone.entities.agents[0], zone };
  const destinationSeekerBT = createDestinationSeekerBT(blackboard);
  return setInterval(() => {
    const departingEntities: EntitiesByZoneId = {};
    const edgeEntitiesUpdateForNeighbors: EntitiesByZoneId = {};
    const ghostUpdateRequests: EntitiesByZoneId = {};
    addArrivingEntitiesToZone(zone, engine);
    applyEdgeEntitiesUpdate(zone, engine);
    // predictEdgeEntityBehaviors(destinationSeekerBT, blackboard);
    // Matter.Engine.update(engine);
    // applyGhostUpdateRequests(zone);

    for (const entityId in zone.entities.agents) {
      const currEntity = zone.entities.agents[entityId];
      executeEntityBehaviors(currEntity, destinationSeekerBT, blackboard);
      handlePotentialZoneDeparture(currEntity, zone, engine, departingEntities);
      considerAddingEntityToNeighborEdgeUpdate(currEntity, zone, edgeEntitiesUpdateForNeighbors);
    }
    if (Object.keys(departingEntities).length) zone.queues.departingEntities.push(cloneDeep(departingEntities));
    // keep the queue of edge updates to no more than 2, we only ever want to keep the most recent update anyway
    if (zone.queues.outgoingEdgeEntityUpdates.length > 1) zone.queues.outgoingEdgeEntityUpdates.shift();
    zone.queues.outgoingEdgeEntityUpdates.push(cloneDeep(edgeEntitiesUpdateForNeighbors));
    // for (const entityId in zone.entities.edge) {
    //   const zoneBelongingTo = zone.entities.edge[entityId].zoneId;
    //   if (!ghostUpdateRequests[zoneBelongingTo]) ghostUpdateRequests[zoneBelongingTo] = {};
    //   ghostUpdateRequests[zoneBelongingTo][entityId] = zone.entities.edge[entityId].entity;
    // }
    // zone.queues.outgoingGhostUpdateRequests.push(cloneDeep(ghostUpdateRequests));
    zone.timeOfLastUpdate = Date.now();
    Matter.Engine.update(engine);
  }, tickRate);
};
