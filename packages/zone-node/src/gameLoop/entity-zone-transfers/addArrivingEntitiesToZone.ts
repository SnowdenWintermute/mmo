import Zone from "../../Zone/Zone";

export default function addArrivingEntitiesToZone(zone: Zone) {
  zone.entities.arriving.forEach((entity) => {
    zone.entities.mobile[entity.id] = entity;
  });
  zone.entities.arriving = [];
}
