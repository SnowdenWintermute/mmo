import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../../entities/BehavioralEntity";
import entityHasDestination from "./entityHasDestination";

export default function entityHasNoDestination(entity: BehavioralEntity, zone: Zone) {
  return !entityHasDestination(entity, zone);
}
