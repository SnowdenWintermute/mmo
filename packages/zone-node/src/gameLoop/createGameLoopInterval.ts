import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { RedisClientType } from "@redis/client";
import { EntitiesByZoneId } from "../Zone/types/EntityCollections";
import Zone from "../Zone/Zone";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import handOffDepartingEntitiesToNeighbor from "./entity-zone-transfers/handOffDepartingEntitiesToNeighbor";
import determineEntitiesOfInterestToNeighbors from "./process-entity-updates/determineEntitiesOfInterestToNeighbors";
import determineZoneDepartures from "./process-entity-updates/determineZoneDepartures";
import moveEntity from "./process-entity-updates/moveEntity";
import publishEdgeEntitiesForNeigborZones from "./process-entity-updates/publishEdgeEntitiesForNeigborZones";
const cloneDeep = require("lodash.clonedeep");

export default (zone: Zone, publisher: RedisClientType, tickRate: number) => {
  return setInterval(() => {
    const departingEntitiesByDestinationZoneId: EntitiesByZoneId = {};
    const entitiesOfInterestToNeighbors: EntitiesByZoneId = {};

    for (const entityId in zone.entities.mobile) {
      const currEntity = zone.entities.mobile[entityId];
      moveEntity(currEntity);
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
  }, tickRate);
};
