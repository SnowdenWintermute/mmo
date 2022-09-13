import { Zone } from "../../../game";
import { packEntities } from "./packEntities";
import { packEntitiesWithZoneIds } from "./packEntitiesWithZoneIds";
const cloneDeep = require("lodash.clonedeep");

export function packZone(zone: Zone) {
  const packedZone = cloneDeep(zone);
  packedZone.entities.agents = packEntities(zone.entities.agents);
  packedZone.entities.edge = packEntitiesWithZoneIds(zone.entities.edge);
  return packedZone;
}
