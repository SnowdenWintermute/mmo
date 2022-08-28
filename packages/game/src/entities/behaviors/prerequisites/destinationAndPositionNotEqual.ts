import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../../BehavioralEntity";

export default function destinationAndPositionNotEqual(entity: BehavioralEntity, zone: Zone) {
  return entity.body.position.x !== entity.destination.x && entity.body.position.y !== entity.destination.y;
}
