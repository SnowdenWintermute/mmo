import Zone from "../../Zone/Zone";

export default function moveMobs(zone: Zone) {
  for (const mob in zone.entities.mobile) {
    zone.entities.mobile[mob].move();
  }
}
