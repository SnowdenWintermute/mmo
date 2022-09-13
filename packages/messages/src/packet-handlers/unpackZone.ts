import { Zone } from "../../../game";
import { unpackEntities } from "./unpackEntities";
import { unpackEntitiesWithZoneIds } from "./unpackEntitiesWithZoneIds";
const cloneDeep = require("lodash.clonedeep");

export function unpackZone(zone: Zone) {
  const unpackedZone = cloneDeep(zone);
  unpackedZone.entities.agents = unpackEntities(unpackedZone.entities.agents);
  unpackedZone.entities.edge = unpackEntitiesWithZoneIds(unpackedZone.entities.edge);
  return unpackedZone;
}
