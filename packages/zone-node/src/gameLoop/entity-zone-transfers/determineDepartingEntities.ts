import Zone from "../../Zone/Zone";

export default function determineDepartingEntities(zone: Zone) {
  const departingEntities = {};
  for (const entity in zone.entities.mobile) {
    const currEntity = zone.entities.mobile[entity];
    // if(currEntity.pos.x)
  }
  return departingEntities;
}
