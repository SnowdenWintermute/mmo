import { RedisClientType } from "@redis/client";
import { EntitiesByZoneId } from "../Zone/types/EntityCollections";
import Zone from "../Zone/Zone";
import addArrivingEntitiesToZone from "./entity-zone-transfers/addArrivingEntitiesToZone";
import handOffDepartingEntitiesToNeighbor from "./entity-zone-transfers/handOffDepartingEntitiesToNeighbor";
import determineEntitiesOfInterestToNeighbors from "./process-entity-updates/determineEntitiesOfInterestToNeighbors";
import determineZoneDepartures from "./process-entity-updates/determineZoneDepartures";
import moveEntity from "./process-entity-updates/moveEntity";
import publishEdgeEntitiesForNeigborZones from "./process-entity-updates/publishEdgeEntitiesForNeigborZones";

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
    // if (zone.id === 1) console.log(entitiesOfInterestToNeighbors);
    for (const zoneId in entitiesOfInterestToNeighbors)
      publishEdgeEntitiesForNeigborZones(entitiesOfInterestToNeighbors[zoneId], zoneId, zone, publisher);
    for (const zoneId in departingEntitiesByDestinationZoneId)
      handOffDepartingEntitiesToNeighbor(departingEntitiesByDestinationZoneId[zoneId], zoneId, zone, publisher);

    addArrivingEntitiesToZone(zone);
  }, tickRate);
};
