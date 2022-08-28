import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../../BehavioralEntity";

export default function entityHasDestination(entity: BehavioralEntity, zone: Zone): boolean {
  return entity.destination !== null && entity.destination !== undefined;
}
