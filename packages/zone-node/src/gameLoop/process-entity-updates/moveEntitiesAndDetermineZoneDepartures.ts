import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import Zone from "../../Zone/Zone";
import determineZoneDepartingTo from "../entity-zone-transfers/determineZoneDepartingTo";
import moveEntity from "./moveEntity";

export default function moveEntitiesAndDetermineZoneDepartures(zone: Zone) {
  const departingEntitiesByDestinationZoneId: {
    [zoneId: string]: { [id: string]: MobileEntity };
  } = {};

  for (const entityId in zone.entities.mobile) {
    const currEntity = zone.entities.mobile[entityId];
    moveEntity(currEntity);
    const zoneDepartingTo = determineZoneDepartingTo(currEntity, zone);
    if (zoneDepartingTo) {
      if (!departingEntitiesByDestinationZoneId.hasOwnProperty(zoneDepartingTo))
        departingEntitiesByDestinationZoneId[zoneDepartingTo] = {};
      departingEntitiesByDestinationZoneId[zoneDepartingTo][currEntity.id] = currEntity;
    }
  }
  return departingEntitiesByDestinationZoneId;
}
