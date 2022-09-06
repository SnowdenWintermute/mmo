import Matter from "matter-js";
import { Zone } from "../../../../game/src";
const cloneDeep = require("lodash.clonedeep");

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  zone.entities.edge = cloneDeep(zone.entities.unappliedEdgeUpdate);
  //   for(const zoneId in zone.entities.edge){
  //     for(const entityId in zone.entities.edge[zoneId]){
  //         const currEntity = zone.entities.edge[zoneId][entityId]
  //         //
  //     }
  //   }
}
