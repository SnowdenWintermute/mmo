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
  return setInterval(() => {
    zone.entities.departing = {};
    zone.entities.ofInterestToNeighbors = {};
    applyEdgeEntitiesUpdate(zone, engine);
    addArrivingEntitiesToZone(zone, engine);
    // predictEdgeEntityBehaviors(destinationSeekerBT, blackboard);

    for (const entityId in zone.entities.agents) {
      const currEntity = zone.entities.agents[entityId];
      executeEntityBehaviors(currEntity, destinationSeekerBT, blackboard);
      determineZoneDepartures(currEntity, zone);
      determineEntitiesOfInterestToNeighbors(currEntity, zone);
    }

    Matter.Engine.update(engine);
    zone.timeOfLastUpdate = Date.now();
  }, tickRate);
};
