import { BehavioralEntity, EntitiesByZoneId, Zone } from "../../../../game";
import determineZoneDepartingTo from "../entity-zone-transfers/determineZoneDepartingTo";

export default function determineZoneDepartures(
  currEntity: BehavioralEntity,
  zone: Zone,
  departingEntitiesByDestinationZoneId: EntitiesByZoneId
) {
  const zoneDepartingTo = determineZoneDepartingTo(currEntity, zone);
  if (zoneDepartingTo) {
    if (!departingEntitiesByDestinationZoneId.hasOwnProperty(zoneDepartingTo))
      departingEntitiesByDestinationZoneId[zoneDepartingTo] = {};
    departingEntitiesByDestinationZoneId[zoneDepartingTo][currEntity.id] = currEntity;
  }
}
