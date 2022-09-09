import { Zone } from "../../../game";
import { unpackEntities } from "./unpackEntities";
const cloneDeep = require("lodash.clonedeep");

export function unpackZone(zone: Zone) {
  const unpackedZone = cloneDeep(zone);
  unpackedZone.entities.agents = unpackEntities(unpackedZone.entities.agents);
  for (const zoneId in unpackedZone.entities.edge)
    unpackedZone.entities.edge[zoneId] = unpackEntities(unpackedZone.entities.edge[zoneId]);
  return unpackedZone;
}
