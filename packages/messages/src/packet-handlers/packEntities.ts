import { packEntity } from "./packEntity";
import { EntitiesById } from "../../../game";

export function packEntities(entities: EntitiesById) {
  const packedEntities: any = {};
  for (const entityId in entities) packedEntities[entityId] = packEntity(entities[entityId]);
  return packedEntities;
}
