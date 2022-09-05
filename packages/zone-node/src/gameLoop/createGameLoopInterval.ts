import {
  EntitiesByZoneId,
  Zone,
  CardinalOrdinalDirection,
  createDestinationSeekerBT,
  BehavioralEntity,
} from "../../../game";
import { RedisClientType } from "@redis/client";
import Matter from "matter-js";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import handOffDepartingEntitiesToNeighbor from "./entity-zone-transfers/handOffDepartingEntitiesToNeighbor";
import determineEntitiesOfInterestToNeighbors from "./process-entity-updates/determineEntitiesOfInterestToNeighbors";
import determineZoneDepartures from "./process-entity-updates/determineZoneDepartures";
import publishEdgeEntitiesForNeigborZones from "./process-entity-updates/publishEdgeEntitiesForNeigborZones";
const cloneDeep = require("lodash.clonedeep");

export default (zone: Zone, engine: Matter.Engine, publisher: RedisClientType, tickRate: number) => {
  const blackboard = { entity: zone.entities.agents[0], zone };
  const destinationSeekerBT = createDestinationSeekerBT(blackboard);
  return setInterval(() => {
    const departingEntitiesByDestinationZoneId: EntitiesByZoneId = {};
    const entitiesOfInterestToNeighbors: EntitiesByZoneId = {};
    for (const entityId in zone.entities.agents) {
      const currEntity = zone.entities.agents[entityId];
      blackboard.entity = currEntity;
      destinationSeekerBT.step();
      // console.log(currEntity.id.slice(2)[0], currEntity.body.position.x, currEntity.body.position.y);
      determineZoneDepartures(currEntity, zone, departingEntitiesByDestinationZoneId);
      determineEntitiesOfInterestToNeighbors(currEntity, zone, entitiesOfInterestToNeighbors);
    }

    let direction: keyof typeof CardinalOrdinalDirection;
    for (direction in zone.neighboringZonesByDirection) {
      for (const zoneId in zone.neighboringZonesByDirection[direction]) {
        publishEdgeEntitiesForNeigborZones(entitiesOfInterestToNeighbors, zoneId, zone, publisher);
        handOffDepartingEntitiesToNeighbor(departingEntitiesByDestinationZoneId, zoneId, zone, publisher);
      }
    }
    addArrivingEntitiesToZone(zone);
    zone.entities.edge = cloneDeep(zone.entities.unappliedEdgeUpdate);
    Matter.Engine.update(engine, tickRate);
  }, tickRate);
};
