import { packEntity } from "./packEntity";
import { EntitiesWithZoneIds } from "../../../game";

export function packEntitiesWithZoneIds(entities: EntitiesWithZoneIds) {
  const packedEntitiesWithZoneIds: any = {};
  for (const entityId in entities)
    packedEntitiesWithZoneIds[entityId] = {
      entity: packEntity(entities[entityId].entity),
      zoneId: entities[entityId].zoneId,
    };
  return packedEntitiesWithZoneIds;
}
