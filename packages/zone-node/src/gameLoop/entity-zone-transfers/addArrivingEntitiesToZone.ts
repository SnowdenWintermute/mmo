import Zone from "../../Zone/Zone";

export default function addArrivingEntitiesToZone(zone: Zone) {
  zone.entities.arriving.forEach((entity) => {
    zone.entities.agents[entity.id] = entity;
  });
  zone.entities.arriving = [];
}
