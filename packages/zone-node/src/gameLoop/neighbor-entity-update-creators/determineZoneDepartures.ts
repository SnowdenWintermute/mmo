import { BehavioralEntity, EntitiesByZoneId, Zone } from "../../../../game";
import determineZoneDepartingTo from "../entity-zone-transfers/determineZoneDepartingTo";

export default function determineZoneDepartures(currEntity: BehavioralEntity, zone: Zone) {
  const { departing } = zone.entities;
  const zoneDepartingTo = determineZoneDepartingTo(currEntity, zone);
  if (zoneDepartingTo) {
    if (!departing.hasOwnProperty(zoneDepartingTo)) departing[zoneDepartingTo] = {};
    departing[zoneDepartingTo][currEntity.id] = currEntity;
  }
}
