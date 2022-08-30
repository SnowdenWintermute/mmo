import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../../entities/BehavioralEntity";

export default function destinationAndPositionNotWithinRadius(entity: BehavioralEntity, zone: Zone) {
  return (
    Math.abs(entity.body.position.x - entity.destination.x) >= entity.body.radius ||
    Math.abs(entity.body.position.y - entity.destination.y) >= entity.body.radius
  );
}
