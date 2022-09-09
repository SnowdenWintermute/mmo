import {
  EntitiesByZoneId,
  Zone,
  CardinalOrdinalDirection,
  createDestinationSeekerBT,
  BehavioralEntity,
} from "../../../game";
import { RedisClientType } from "@redis/client";
import Matter, { Collision, Vector } from "matter-js";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import handOffDepartingEntitiesToNeighbor from "../broadcasts/handOffDepartingEntitiesToNeighbor";
import determineEntitiesOfInterestToNeighbors from "./neighbor-entity-update-creators/determineEntitiesOfInterestToNeighbors";
import determineZoneDepartures from "./neighbor-entity-update-creators/determineZoneDepartures";
import publishEdgeEntitiesForNeigborZones from "../broadcasts/publishEdgeEntitiesForNeigborZones";
import applyEdgeEntitiesUpdate from "./entity-zone-transfers/applyEdgeEntitiesUpdate";
import executeEntityBehaviors from "./entity-behavior-execution/executeEntityBehaviors";
import predictEdgeEntityBehaviors from "./entity-behavior-execution/predictEdgeEntityBehaviors";

export default (zone: Zone, engine: Matter.Engine, publisher: RedisClientType, tickRate: number) => {
  const blackboard = { entity: zone.entities.agents[0], zone };
  const destinationSeekerBT = createDestinationSeekerBT(blackboard);
  let departingEntitiesByDestinationZoneId: EntitiesByZoneId = {};
  let entitiesOfInterestToNeighbors: EntitiesByZoneId = {};
  return setInterval(() => {
    applyEdgeEntitiesUpdate(zone, engine);
    // predictEdgeEntityBehaviors(destinationSeekerBT, blackboard);
    departingEntitiesByDestinationZoneId = {};
    entitiesOfInterestToNeighbors = {};

    let lastEntity: BehavioralEntity | null = null;
    for (const entityId in zone.entities.agents) {
      const currEntity = zone.entities.agents[entityId];
      executeEntityBehaviors(currEntity, destinationSeekerBT, blackboard);
      determineZoneDepartures(currEntity, zone, departingEntitiesByDestinationZoneId);
      determineEntitiesOfInterestToNeighbors(currEntity, zone, entitiesOfInterestToNeighbors);
      lastEntity = currEntity;
    }

    let direction: keyof typeof CardinalOrdinalDirection;
    for (direction in zone.neighboringZonesByDirection) {
      for (const zoneId in zone.neighboringZonesByDirection[direction]) {
        publishEdgeEntitiesForNeigborZones(entitiesOfInterestToNeighbors, zoneId, zone, publisher);
        handOffDepartingEntitiesToNeighbor(departingEntitiesByDestinationZoneId, zoneId, zone, engine, publisher);
      }
    }

    Matter.Engine.update(engine, tickRate);
    addArrivingEntitiesToZone(zone, engine);
  }, tickRate);
};
