import { EntitiesWithZoneIds } from "../../../game/src";
import { unpackEntity } from "./unpackEntity";
export function unpackEntitiesWithZoneIds(entitiesWithZoneIds: EntitiesWithZoneIds) {
  const unpackedEntitiesWithZoneIds: EntitiesWithZoneIds = {};
  for (const entityId in entitiesWithZoneIds)
    unpackedEntitiesWithZoneIds[entityId] = {
      entity: unpackEntity(entitiesWithZoneIds[entityId].entity),
      zoneId: entitiesWithZoneIds[entityId].zoneId,
    };
  return unpackedEntitiesWithZoneIds;
}
