import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import { EntitiesByZoneId } from "@permadeath/game/dist/Zone/types/EntityCollections";
import Zone from "@permadeath/game/dist/Zone/Zone";
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
