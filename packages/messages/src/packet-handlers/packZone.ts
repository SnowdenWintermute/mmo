import { Zone } from "../../../game";
import { packEntities } from "./packEntities";
const cloneDeep = require("lodash.clonedeep");

export function packZone(zone: Zone) {
  const packedZone = cloneDeep(zone);
  packedZone.entities.agents = packEntities(zone.entities.agents);
  for (const edgeZoneId in zone.entities.edge)
    packedZone.entities.edge[edgeZoneId] = packEntities(zone.entities.edge[edgeZoneId]);
  return packedZone;
}
