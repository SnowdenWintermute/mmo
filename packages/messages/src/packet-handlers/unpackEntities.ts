import { EntitiesById } from "../../../game/src";
import { unpackEntity } from "./unpackEntity";
export function unpackEntities(entities: EntitiesById) {
  const unpackedEntities: any = {};
  for (const entityId in entities) unpackedEntities[entityId] = unpackEntity(entities[entityId]);
  return unpackedEntities;
}
